import random
import math
import time
import numpy as np

# Parâmetros do algoritmo
BITSTRING_LENGTH = 20  # Precisão de ~1e-6 (mais que suficiente para 3 casas)
POP_SIZE = 150
MAX_GENERATIONS = 200

def decode_bitstring(bitstring):
    """Converte bitstring para valor real no intervalo [0, 1]"""
    value = int(''.join(map(str, bitstring)), 2)
    return value / (2**BITSTRING_LENGTH - 1)

def create_individual():
    """Cria um indivíduo aleatório como bitstring"""
    return [random.randint(0, 1) for _ in range(BITSTRING_LENGTH)]

# Função de Avaliação
def g(x):
    """Função objetivo a ser maximizada"""
    term1 = 2 ** (-2 * ((x - 0.1) / 0.9) ** 2)
    term2 = (math.sin(5 * math.pi * x)) ** 6
    return term1 * term2

def evaluate(individual):
    """Avalia um indivíduo decodificando e calculando g(x)"""
    x = decode_bitstring(individual)
    return g(x)

# Métodos de Seleção
def roulette_selection(population, fitnesses):
    """Seleção por roleta proporcional à fitness"""
    total_fitness = sum(fitnesses)
    pick = random.uniform(0, total_fitness)
    current = 0
    for i, ind in enumerate(population):
        current += fitnesses[i]
        if current > pick:
            return ind
    return population[-1]

def tournament_selection(population, fitnesses, k=3):
    """Seleção por torneio de tamanho k"""
    selected = random.sample(list(zip(population, fitnesses)), k)
    return max(selected, key=lambda x: x[1])[0]

def sus_selection(population, fitnesses, n):
    """Amostragem Universal Estocástica (SUS)"""
    total_fitness = sum(fitnesses)
    pointers = [i * total_fitness / n + random.uniform(0, total_fitness / n)
                for i in range(n)]
    return _select_with_pointers(population, fitnesses, pointers)

def _select_with_pointers(population, fitnesses, pointers):
    """Auxiliar para SUS"""
    selected = []
    cumsum = np.cumsum(fitnesses)
    for p in pointers:
        idx = np.searchsorted(cumsum, p)
        selected.append(population[idx])
    return selected