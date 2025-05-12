import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler, StandardScaler, RobustScaler, MaxAbsScaler
from sklearn.linear_model import Perceptron
from sklearn.model_selection import cross_val_score, learning_curve, StratifiedKFold
from sklearn.metrics import confusion_matrix, accuracy_score
from sklearn.preprocessing import normalize

SCALER_TECHNIQUE_MIN_MAX = 'min_max' # (x - x.min) / (x.max - x.min)
SCALER_TECHNIQUE_STANDARD = 'standard' # (x - mean) / std
SCALER_TECHNIQUE_ROBUST = 'robust' # (x - median) / IQR
SCALER_TECHNIQUE_MAX_ABS = 'max_abs' # x / abs(x).max

MAX_EPOCHS = 50
SEGMENTS = ['Treinamento', 'Validação', 'Teste']
INITIAL_SCALES = [
    SCALER_TECHNIQUE_MIN_MAX, 
    SCALER_TECHNIQUE_STANDARD,
    SCALER_TECHNIQUE_ROBUST,
    SCALER_TECHNIQUE_MAX_ABS
]
LEARNING_RATES = [0.0001, 0.001, 0.01, 0.1, 1.0]
NORMALIZED_STATE = [True, False]

# Converter valores para escala
def scale_values(x, normalize_values=False, technique=SCALER_TECHNIQUE_STANDARD):
    if (technique == SCALER_TECHNIQUE_MIN_MAX): 
        scaler = MinMaxScaler()
    elif (technique == SCALER_TECHNIQUE_ROBUST): 
        scaler = RobustScaler()
    elif (technique == SCALER_TECHNIQUE_MAX_ABS): 
        scaler = MaxAbsScaler()
    else:
        scaler = StandardScaler()

    x_scaled = scaler.fit_transform(x)
    
    if (normalize_values):
        x_scaled = normalize(x_scaled)

    return x_scaled

# Personalização da Classe Perceptron
class ConvergencePerceptron(Perceptron):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.training_errors_ = []

    def partial_fit(self, X, y, classes=None):
        super().partial_fit(X, y, classes=classes)
        y_pred = self.predict(X)
        error = 1 - accuracy_score(y, y_pred)
        self.training_errors_.append(error)
        return self
    
    def fit(self, X, y, coef_init=None, intercept_init=None):
        self.training_errors_ = []
        super().fit(X, y, coef_init=coef_init, intercept_init=intercept_init)
        return self

def create_report(x, y, random_state=42):
    # Separação das bases
    x_train, x_aux, y_train, y_aux = train_test_split(x, y, test_size=0.3, random_state=random_state)
    x_val, x_test, y_val, y_test = train_test_split(x_aux, y_aux, test_size=0.5, random_state=random_state)

    best_accuracy = 0
    for normalize_state in NORMALIZED_STATE:
        for init_scale in INITIAL_SCALES:
            # Escalar e normalizar/não normalizar
            scaled_train = scale_values(x_train, normalize_values=normalize_state, technique=init_scale)
            scaled_val = scale_values(x_val, normalize_values=normalize_state, technique=init_scale)

            for learning_rate in LEARNING_RATES:
                # Treinar
                perceptron = ConvergencePerceptron(eta0=learning_rate, random_state=random_state, max_iter=50, warm_start=True, early_stopping=False)

                epoch_errors = []
                for _ in range(MAX_EPOCHS):
                    perceptron.partial_fit(scaled_train, y_train, classes=np.unique(y_train))
                    epoch_errors.append(perceptron.training_errors_[-1])

                # Avaliar
                val_predictions = perceptron.predict(scaled_val)
                val_accuracy = accuracy_score(y_val, val_predictions)

                if val_accuracy > best_accuracy:
                    best_accuracy = val_accuracy

                    best_model = perceptron
                    best_normalize_state = normalize_state
                    best_init_scale = init_scale
                    best_learning_rate = learning_rate
                    best_epoch_errors = epoch_errors

    # Escalar com melhor configuração
    scaled_train = scale_values(x_train, normalize_values=best_normalize_state, technique=best_init_scale)
    scaled_val = scale_values(x_val, normalize_values=best_normalize_state, technique=best_init_scale)
    scaled_test = scale_values(x_test, normalize_values=best_normalize_state, technique=best_init_scale)

    # Validação cruzada
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=random_state)
    cv_scores = cross_val_score(best_model, scaled_train, y_train, cv=cv, scoring='accuracy')

    # Curva aprendizado
    learn_curve = learning_curve(
        Perceptron(max_iter=MAX_EPOCHS, random_state=random_state), scaled_train, y_train, cv=cv, 
        train_sizes=np.linspace(0.1, 1.0, 5), 
        random_state=random_state,
        scoring='accuracy')

    result = {
        'normalize_state': str(best_normalize_state),
        'init_scale': best_init_scale,
        'learning_rate': f"{best_learning_rate:.4f}",
        'epoch_errors': best_epoch_errors,
        'cv_scores': cv_scores,
        'learning_curve': learn_curve,
    }

    # Avaliar por segmentação
    for name, x, y in [('Treinamento', scaled_train, y_train),
                    ('Validação', scaled_val, y_val),
                    ('Teste', scaled_test, y_test)]:
        y_pred = best_model.predict(x)
        accuracy = f"{accuracy_score(y, y_pred):.2f}"

        result[name] = {
            "accuracy": accuracy,
            "confusion_matrix": confusion_matrix(y, y_pred)
        }

    return result
