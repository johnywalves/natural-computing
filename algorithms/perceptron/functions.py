from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler, StandardScaler, RobustScaler, MaxAbsScaler
from sklearn.linear_model import Perceptron
from sklearn.metrics import confusion_matrix, accuracy_score

SCALER_TECHNIQUE_MIN_MAX = 'min_max' # (x - x.min) / (x.max - x.min)
SCALER_TECHNIQUE_STANDARD = 'standard' # (x - mean) / std
SCALER_TECHNIQUE_ROBUST = 'robust' # (x - median) / IQR
SCALER_TECHNIQUE_MAX_ABS = 'max_abs' # x / abs(x).max

INITIAL_SCALES = [
    SCALER_TECHNIQUE_MIN_MAX, 
    SCALER_TECHNIQUE_STANDARD,
    SCALER_TECHNIQUE_ROBUST,
    SCALER_TECHNIQUE_MAX_ABS
]
LEARNING_RATES = [0.0001, 0.001, 0.01, 0.1, 0.25]

# Normalizar
def normalize_values(x_train, x_val, x_test, technique=SCALER_TECHNIQUE_STANDARD):
    if (technique == SCALER_TECHNIQUE_MIN_MAX): 
        scaler = MinMaxScaler()
    elif (technique == SCALER_TECHNIQUE_ROBUST): 
        scaler = RobustScaler()
    elif (technique == SCALER_TECHNIQUE_MAX_ABS): 
        scaler = MaxAbsScaler()
    else:
        scaler = StandardScaler()

    x_train_scaled = scaler.fit_transform(x_train)
    x_val_scaled = scaler.transform(x_val)
    x_test_scaled = scaler.transform(x_test)

    return x_train_scaled, x_val_scaled, x_test_scaled

def create_report(x, y):
    scales = []
    # Separação das bases
    x_train, x_aux, y_train, y_aux = train_test_split(x, y, test_size=0.3, random_state=42)
    x_val, x_test, y_val, y_test = train_test_split(x_aux, y_aux, test_size=0.5, random_state=42)

    for init_scale in INITIAL_SCALES:
        rates = []
        # Normalizar
        scaled_train, scaled_val, scaled_test = normalize_values(x_train, x_val, x_test, init_scale)
        
        for learning_rate in LEARNING_RATES:
            # Treinar
            perceptron = Perceptron(eta0=learning_rate, random_state=42, max_iter=200, early_stopping=True)
            perceptron.fit(scaled_train, y_train)

            # Avaliar
            for name, x, y in [('Treinamento', scaled_train, y_train),
                            ('Validação', scaled_val, y_val),
                            ('Teste', scaled_test, y_test)]:
                y_pred = perceptron.predict(x)
                print(f"{name} - Acurácia: {accuracy_score(y, y_pred):.2f}")
                print("Matriz de confusão:")
                print(confusion_matrix(y, y_pred))

            # Avaliar
            y_pred = perceptron.predict(scaled_test)

            rates.append({
                'init_scale': init_scale,
                'learning_rate': learning_rate,
                'accuracy': f"{accuracy_score(y_test, y_pred):.2f}"
            })

        scales.append(rates)
    return scales
