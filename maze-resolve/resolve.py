import random
import numpy as np

from keras.models import Sequential
from keras.layers import Dense
from keras.optimizers import Adam

from labirintoEnv import LabirintoEnv
from filePathTaken import FilePathTaken

def criar_modelo():
    model = Sequential()
    model.add(Dense(128, input_dim=2, activation='relu'))  # Entrada: (x, y)
    model.add(Dense(64, activation='relu'))
    model.add(Dense(4, activation='linear'))  # Saída: Q-valor para cada ação
    model.compile(loss='mse', optimizer=Adam(learning_rate=0.001))
    return model

# Iniciar instâncias 
env = LabirintoEnv()
taken = FilePathTaken()
modelo = criar_modelo()

# Parâmetros de treinamento
epsilon = 1.0  # Exploração inicial
gamma = 0.95   # Fator de desconto
episodes = 3

# Escrever arquivo do caminho
for episodio in range(episodes):
    estado = env.reset()
    caminho = [estado]
    taken.start(episodio, estado)

    done = False
    while not done:
        # Escolha da ação (epsilon-greedy)
        if random.uniform(0, 1) < epsilon:
            action = random.randint(0, 3)  # Exploração aleatória
        else:
            q_values = modelo.predict(np.array([estado]), verbose=0)
            action = np.argmax(q_values[0])  # Exploração da melhor ação

        # Execute a ação e observe o próximo estado
        novo_estado, recompensa, done = env.passo(action)
        taken.add(novo_estado)

        # Atualize o modelo (Q-Learning)
        alvo = recompensa + gamma * np.max(modelo.predict(np.array([novo_estado]), verbose=0))
        q_values = modelo.predict(np.array([estado]), verbose=0)
        q_values[0][action] = alvo
        modelo.fit(np.array([estado]), q_values, verbose=0)

        estado = novo_estado
        
    # Decaimento do epsilon
    epsilon = max(0.01, epsilon * 0.995)

    # Finalizar arquivo
    taken.end()

# Finalizar manifesto
taken.finish()    
