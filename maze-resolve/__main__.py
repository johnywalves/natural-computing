import random
import os
import numpy as np
from keras import Sequential, layers, optimizers

from labirintoEnv import LabirintoEnv
from filePathTaken import FilePathTaken

def criar_modelo():
    model = Sequential([
        layers.Dense(128, input_dim=6, activation='relu'), # Entrada: (x, y, topo, direita, baixo, esquerda) 
        layers.Dense(64, activation='relu'),
        layers.Dense(4, activation='linear'),  # Saída: Q-valor para cada ação
    ])
    model.compile(loss='mse', optimizer=optimizers.Adam(learning_rate=0.001))
    return model

# Iniciar instâncias 
env = LabirintoEnv()
taken = FilePathTaken()
modelo = criar_modelo()
os.system('cls' if os.name == 'nt' else 'clear')

# Parâmetros de treinamento
epsilon = 1.0  # Exploração inicial
gamma = 0.95   # Fator de desconto
episodes = 10   # Quantidade total de ciclos

# Escrever arquivo do caminho
for episodio in range(episodes):
    estado = env.reset()
    taken.start(episodio, estado)
    print(f"episódio: {episodio + 1}")

    done = False
    while not done:
        # Escolha da ação (epsilon-greedy)
        if random.uniform(0, 1) < epsilon:
            action = random.randint(0, 3)  # Exploração aleatória
        else:
            q_values = modelo.predict(env.apura_info(), verbose=0)  # Q-Learning Array<1, 4>
            action = np.argmax(q_values[0])  # Exploração da melhor ação - Índice melhor resultado

        # Execute a ação e observe o próximo estado
        novo_estado, recompensa, done = env.passo(action)
        info = env.apura_info()
        taken.add(novo_estado)

        # Atualize o modelo (Q-Learning)
        q_values = modelo.predict(info, verbose=0)  # Q-Learning Array<1, 4>
        alvo = recompensa + gamma * np.max(q_values)
        q_values[0][action] = alvo
        modelo.fit(info, q_values, verbose=0)

        estado = novo_estado
        
    # Decaimento do epsilon
    epsilon = max(0.01, epsilon * 0.995)

    # Finalizar arquivo
    taken.end()

# Finalizar manifesto
taken.finish()    
