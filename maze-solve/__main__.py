import random
import numpy as np

from Environment import Environment
from filePathTaken import FilePathTaken

# Iniciar instâncias 
env = Environment()
taken = FilePathTaken()
q_table = np.zeros([env.n_possibilidades, env.n_acoes])

# Parâmetros de treinamento
epsilon = 1.0   # Exploração inicial
alpha = 0.1
gamma = 0.95    # Fator de desconto
episodes = 100  # Quantidade total de ciclos

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
            action = np.argmax(q_table[env.index_estado])  # Exploração da melhor ação - Índice melhor resultado

        # Execute a ação e observe o próximo estado
        index_antigo = env.index_estado
        index, novo_estado, recompensa, done = env.passo(action)
        taken.add(novo_estado)

        antigo_valor = q_table[index_antigo, action]
        novo_max = np.max(q_table[index])
        
        novo_valor = (1 - alpha) * antigo_valor + alpha * (recompensa + gamma * novo_max)
        q_table[index_antigo, action] = novo_valor

        estado = novo_estado
        
    # Decaimento do epsilon
    epsilon = max(0.01, epsilon * 0.995)

    # Finalizar arquivo
    taken.end()

# Finalizar manifesto
taken.finish()    
