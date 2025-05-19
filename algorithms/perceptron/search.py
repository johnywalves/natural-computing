import os
import time
import numpy as np
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import mnist
from tensorflow.keras.utils import plot_model

EPOCHS = 15

# Carregar os dados
(x_train, y_train), (x_test, y_test) = mnist.load_data()

# Normalizar os valores de pixel para [0, 1]
x_train = x_train.astype("float32") / 255
x_test = x_test.astype("float32") / 255

# Redimensionar as imagens para incluir o canal (28, 28, 1)
x_train = np.expand_dims(x_train, -1)
x_test = np.expand_dims(x_test, -1)

# Converter rótulos para one-hot encoding
num_classes = 10
y_train = keras.utils.to_categorical(y_train, num_classes)
y_test = keras.utils.to_categorical(y_test, num_classes)

# Perceptron Multicamadas
def build_mlp_model():
    model = keras.Sequential([
        layers.Flatten(input_shape=(28, 28, 1)),
        layers.Dense(128, activation='relu'),
        layers.Dense(64, activation='relu'),
        layers.Dense(num_classes, activation='softmax')
    ])
    return model

# Rede Neural Convolucional
def build_cnn_model():
    model = keras.Sequential([
        layers.Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)),
        layers.MaxPooling2D(pool_size=(2, 2)),
        layers.Conv2D(64, kernel_size=(3, 3), activation='relu'),
        layers.MaxPooling2D(pool_size=(2, 2)),
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dense(num_classes, activation='softmax')
    ])
    return model

# Rede Neural Profunda Convolucional
def build_deep_cnn_model():
    model = keras.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', padding='same', input_shape=(28, 28, 1)),
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        
        layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
        layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        
        layers.Flatten(),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='softmax')
    ])
    return model

# Rede Neural Profunda Convolucional com Batch Normalization
def build_cnn_bn_model():
    model = keras.Sequential([
        layers.Conv2D(32, kernel_size=(3, 3), input_shape=(28, 28, 1)),
        layers.BatchNormalization(),
        layers.Activation('relu'),
        layers.MaxPooling2D(pool_size=(2, 2)),
        
        layers.Conv2D(64, kernel_size=(3, 3)),
        layers.BatchNormalization(),
        layers.Activation('relu'),
        layers.MaxPooling2D(pool_size=(2, 2)),
        
        layers.Flatten(),
        layers.Dense(128),
        layers.BatchNormalization(),
        layers.Activation('relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='softmax')
    ])
    return model

# Função para compilar e treinar o modelo
def train_and_evaluate(model, model_name, plot_name):
    optimizer = keras.optimizers.Adam(learning_rate=0.001)
    loss_fn = keras.losses.CategoricalCrossentropy()

    # Compila o modelo
    model.compile(optimizer=optimizer, loss=loss_fn, metrics=['accuracy'])
    
    # Treina o modelo e mede o tempo
    start_time = time.time()
    model.fit(
        x_train, y_train,
        batch_size=128,
        epochs=EPOCHS,
        validation_split=0.1,
        verbose=1
    )
    training_time = time.time() - start_time
    avg_time_per_epoch = training_time / EPOCHS

    # Avalia o modelo
    test_loss, test_acc = model.evaluate(x_test, y_test, verbose=0)

    # Coleta o número de parâmetros
    params = model.count_params()

    # Formata os dados para a tabela
    params_str = f"~{params/1000:.0f}k" if params < 1e6 else f"~{params/1e6:.1f}M"

    # Plotar formato da Rede Neural
    model_image = os.path.join('figs', f"{plot_name}.jpg")
    plot_model(model, model_image, show_shapes=True)

    return {
        "Arquitetura": model_name,
        "Acurácia no Teste": f"{test_acc*100:.2f}%",
        "Perdas": f"{test_loss*100:.2f}%",
        "Tempo por Época": f"~{avg_time_per_epoch:.1f}s",
        "Parâmetros": params_str,
        "Plot": model_image
    }

def train_nn():
    results = []

    mlp_model = build_mlp_model()
    results.append(train_and_evaluate(mlp_model, 'Perceptron Multicamadas', 'mlp_model'))

    cnn_model = build_cnn_model()
    results.append(train_and_evaluate(cnn_model, 'Rede Neural Convolucional', 'cnn_model'))

    deep_cnn_model = build_deep_cnn_model()
    results.append(train_and_evaluate(deep_cnn_model, 'Rede Neural Profunda Convolucional', 'deep_cnn_model'))

    cnn_bn_model = build_cnn_bn_model()
    results.append(train_and_evaluate(cnn_bn_model, 'Rede Neural Profunda Convolucional com Batch Normalization', 'cnn_bn_model'))

    return results
