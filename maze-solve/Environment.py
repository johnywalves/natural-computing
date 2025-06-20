import numpy as np

VERBOSE = False
INITIAL_POSITION = (0, 0)

BINARY_MODEL_BORDER =  {
  0x00: [0, 0, 0, 0],
  0x01: [1, 0, 0, 0],
  0x02: [0, 1, 0, 0],
  0x03: [1, 1, 0, 0],
  0x04: [0, 0, 1, 0],
  0x05: [1, 0, 1, 0],
  0x06: [0, 1, 1, 0],
  0x07: [1, 1, 1, 0],
  0x08: [0, 0, 0, 1],
  0x09: [1, 0, 0, 1],
  0x0a: [0, 1, 0, 1],
  0x0b: [1, 1, 0, 1],
  0x0c: [0, 0, 1, 1],
  0x0d: [1, 0, 1, 1],
  0x0e: [0, 1, 1, 1],
  0x0f: [1, 1, 1, 1], 
}

# 3path_test.c
labirinto = np.array([
  0x0e, 0x0a, 0x0a, 0x08, 0x0a, 0x0a, 0x0a, 0x08, 0x0a, 0x0a, 0x08, 0x0a, 0x0a,
  0x08, 0x0a, 0x09, 0x0c, 0x0a, 0x08, 0x02, 0x0a, 0x0a, 0x0a, 0x00, 0x0a, 0x0a,
  0x02, 0x0a, 0x09, 0x06, 0x08, 0x01, 0x04, 0x09, 0x05, 0x0c, 0x0a, 0x0a, 0x0a,
  0x02, 0x08, 0x0a, 0x0a, 0x0a, 0x00, 0x0b, 0x05, 0x05, 0x05, 0x05, 0x05, 0x04,
  0x0a, 0x0a, 0x0a, 0x09, 0x05, 0x0c, 0x0a, 0x0a, 0x03, 0x0c, 0x03, 0x05, 0x05,
  0x05, 0x05, 0x06, 0x0a, 0x0a, 0x09, 0x05, 0x04, 0x03, 0x0e, 0x08, 0x0a, 0x02,
  0x0b, 0x07, 0x05, 0x05, 0x06, 0x0a, 0x08, 0x0a, 0x02, 0x02, 0x03, 0x0e, 0x09,
  0x06, 0x0a, 0x0a, 0x0a, 0x09, 0x05, 0x06, 0x0a, 0x08, 0x02, 0x0a, 0x08, 0x0a,
  0x0b, 0x0c, 0x01, 0x0c, 0x08, 0x08, 0x09, 0x05, 0x04, 0x0a, 0x09, 0x06, 0x0a,
  0x09, 0x05, 0x0c, 0x09, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x0d,
  0x04, 0x08, 0x09, 0x05, 0x05, 0x06, 0x02, 0x03, 0x04, 0x00, 0x02, 0x03, 0x05,
  0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x06, 0x0a, 0x09, 0x0e, 0x01, 0x06,
  0x0a, 0x0a, 0x03, 0x05, 0x05, 0x05, 0x04, 0x02, 0x02, 0x02, 0x08, 0x08, 0x01,
  0x0f, 0x06, 0x0a, 0x09, 0x0e, 0x0a, 0x01, 0x04, 0x01, 0x05, 0x0c, 0x0a, 0x0a,
  0x03, 0x05, 0x04, 0x09, 0x0e, 0x0a, 0x02, 0x08, 0x09, 0x05, 0x05, 0x05, 0x05,
  0x04, 0x0a, 0x0a, 0x0a, 0x03, 0x07, 0x06, 0x0a, 0x0a, 0x09, 0x07, 0x05, 0x05,
  0x07, 0x05, 0x05, 0x06, 0x0a, 0x0a, 0x0a, 0x08, 0x08, 0x0a, 0x0a, 0x0a, 0x00,
  0x0b, 0x05, 0x05, 0x0c, 0x03, 0x06, 0x0a, 0x0a, 0x08, 0x0a, 0x03, 0x06, 0x0a,
  0x0a, 0x0a, 0x01, 0x0c, 0x02, 0x01, 0x06, 0x0a, 0x0a, 0x0a, 0x0a, 0x02, 0x0a,
  0x0a, 0x0a, 0x0a, 0x0a, 0x0a, 0x02, 0x02, 0x0a, 0x03,
]).reshape(16, 16).T

if (VERBOSE):
    print(labirinto)

class Environment:
    def __init__(self):
        self.labirinto = labirinto
        self.n_possibilidades = labirinto.shape[0] * labirinto.shape[1]
        self.n_acoes = 4  # Cima, Direita, Baixo, Esquerda

        self.reset()

    def apura_paredes(self, x, y):
        code = labirinto[x, y]

        if (VERBOSE):
            print('code', code)

        return BINARY_MODEL_BORDER[code]

    def atualiza_estado(self, novo_estado):
        self.index_estado = novo_estado[0] * 16 + novo_estado[1] 
        self.prev_estado = self.estado
        self.estado = novo_estado

    def reset(self):
        self.index_estado = 0
        self.prev_estado = INITIAL_POSITION  # Início no canto inferior esquerdo (0,0)
        self.estado = INITIAL_POSITION  # Início no canto inferior esquerdo (0,0)
        return self.estado

    def avalia(self, action, novo_estado):
        paredes = self.apura_paredes(self.estado[0], self.estado[1])

        cima = paredes[0] == 0 and action == 0 # Cima
        baixo = paredes[2] == 0 and action == 1 # Baixo
        esquerda = paredes[3] == 0 and action == 2 # Esquerda
        direita = paredes[1] == 0 and action == 3 # Direita

        if (VERBOSE):
            print('paredes', paredes)
            print('cima', cima)
            print('baixo', baixo)
            print('esquerda', esquerda)
            print('direita', direita)

        if (cima or direita or baixo or esquerda): 
            centro_x = novo_estado[0] in [7, 8]
            centro_y = novo_estado[1] in [7, 8]
            if (centro_x and centro_y):
                return 2

            return 0
        
        return -1

    def passo(self, action):
        x, y = self.estado
        if action == 0:   # Cima
            novo_estado = (x + 1, y)
        elif action == 1: # Baixo
            novo_estado = (x - 1, y)
        elif action == 2: # Esquerda
            novo_estado = (x, y - 1)
        elif action == 3: # Direita
            novo_estado = (x, y + 1)

        if (VERBOSE):
            print('==================')
            print('action', action)
            print(f"{x},{y} => {novo_estado[0]},{novo_estado[1]}")

        # Verifique se o novo estado é válido
        done = False
        if (0 <= novo_estado[0] < 16 and 0 <= novo_estado[1] < 16):
            resultado = self.avalia(action, novo_estado)
            if resultado == 0:  # Caminho livre
                self.atualiza_estado(novo_estado)
                recompensa = -0.1
            elif resultado == 2:  # Objetivo
                self.atualiza_estado(novo_estado)
                recompensa = 100
                done = True
            else:  # Parede
                recompensa = -1
                done = False
        else:  # Fora do labirinto
            recompensa = -1
            done = False

        return self.index_estado, self.estado, recompensa, done
