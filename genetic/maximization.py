import math
import numpy as np
import time
import random
random.seed(42)

from bitstring import DEFAULT_CROSSOVER, DEFAULT_MUTATION, create_individual, mutate, crossover

# Parâmetros do algoritmo
BITSTRING_LENGTH = 20  # Precisão de ~1e-6 (mais que suficiente para 3 casas)
POP_SIZE = 150
MAX_GENERATIONS = 200
RESULT_EXECUTION = 10 

# Converte bitstring para valor real no intervalo [0, 1]
def decode_bitstring(bitstring):
    value = int(''.join(map(str, bitstring)), 2)
    return value / (2**BITSTRING_LENGTH - 1)

# Função de Avaliação
def g(x):
    term1 = 2 ** (-2 * ((x - 0.1) / 0.9) ** 2)
    term2 = (math.sin(5 * math.pi * x)) ** 6
    return term1 * term2

# Avalia um indivíduo decodificando e calculando g(x)
def evaluate(individual):
    x = decode_bitstring(individual)
    return g(x)

# Seleção por roleta proporcional à fitness
def roulette_selection(population, fitnesses):
    total_fitness = sum(fitnesses)
    pick = random.uniform(0, total_fitness)
    current = 0
    for i, ind in enumerate(population):
        current += fitnesses[i]
        if current > pick:
            return ind
    return population[-1]

# Seleção por torneio de tamanho k
def tournament_selection(population, fitnesses, k=3):
    selected = random.sample(list(zip(population, fitnesses)), k)
    return max(selected, key=lambda x: x[1])[0]

# Amostragem Universal Estocástica (SUS)
def sus_selection(population, fitnesses, n):
    total_fitness = sum(fitnesses)
    pointers = [i * total_fitness / n + random.uniform(0, total_fitness / n)
                for i in range(n)]
    return _select_with_pointers(population, fitnesses, pointers)

# Auxiliar para SUS
def _select_with_pointers(population, fitnesses, pointers):
    selected = []
    cumsum = np.cumsum(fitnesses)
    for p in pointers:
        idx = np.searchsorted(cumsum, p)
        selected.append(population[idx])
    return selected

# Executa o algoritmo genético completo
def genetic_algorithm(selection_method='tournament', crossover_rate=DEFAULT_CROSSOVER, mutation_rate=DEFAULT_MUTATION):
    population = [create_individual(BITSTRING_LENGTH) for _ in range(POP_SIZE)]
    best_values = []
    avg_values = []
    start_time = time.time()
    
    for gen in range(MAX_GENERATIONS):
        # Avaliar população
        fitnesses = [evaluate(ind) for ind in population]
        best_fitness = max(fitnesses)
        avg_fitness = sum(fitnesses) / len(fitnesses)
        best_values.append(best_fitness)
        avg_values.append(avg_fitness)
        
        # Critério de parada opcional (convergência)
        if gen > 20 and abs(best_values[-1] - best_values[-20]) < 1e-6:
            break
        
        # Seleção de pais
        if selection_method == 'roulette':
            parents = [roulette_selection(population, fitnesses) for _ in range(POP_SIZE)]
        elif selection_method == 'sus':
            parents = sus_selection(population, fitnesses, POP_SIZE)
        else:  # tournament por padrão
            parents = [tournament_selection(population, fitnesses) for _ in range(POP_SIZE)]
        
        # Crossover e mutação
        new_population = []
        for i in range(0, POP_SIZE, 2):
            parent1, parent2 = parents[i], parents[i+1]
            child1, child2 = crossover(parent1, parent2, crossover_rate)
            new_population.extend([mutate(child1, mutation_rate), 
                                 mutate(child2, mutation_rate)])
        
        population = new_population[:POP_SIZE]
    
    exec_time = time.time() - start_time
    return max(best_values), exec_time, best_values, avg_values

# Implementação de subida da colina com representação binária
def hill_climbing(iterations=1000):
    current = create_individual(BITSTRING_LENGTH)
    current_fitness = evaluate(current)
    best_fitness = current_fitness
    start_time = time.time()
    
    for _ in range(iterations):
        # Gera vizinho (mutação de 1 bit)
        neighbor = mutate(current, 1/BITSTRING_LENGTH)
        neighbor_fitness = evaluate(neighbor)
        
        if neighbor_fitness > current_fitness:
            current, current_fitness = neighbor, neighbor_fitness
            if neighbor_fitness > best_fitness:
                best_fitness = neighbor_fitness
    
    return best_fitness, time.time() - start_time

# Implementação de recozimento simulado com representação binária
def simulated_annealing(iterations=1000, initial_temp=100, cooling_rate=0.99):
    current = create_individual(BITSTRING_LENGTH)
    current_fitness = evaluate(current)
    best_fitness = current_fitness
    temp = initial_temp
    start_time = time.time()
    
    for _ in range(iterations):
        # Gera vizinho
        neighbor = mutate(current, 1/BITSTRING_LENGTH)
        neighbor_fitness = evaluate(neighbor)
        
        # Calcula diferença de energia
        delta = neighbor_fitness - current_fitness
        
        # Critério de aceitação
        if delta > 0 or random.random() < math.exp(delta / temp):
            current, current_fitness = neighbor, neighbor_fitness
            if neighbor_fitness > best_fitness:
                best_fitness = neighbor_fitness
        
        # Resfriamento
        temp *= cooling_rate
    
    return best_fitness, time.time() - start_time

# Compara Algoritmo Genético, Subida da Colina e Recozimento Simulado
def compare_algorithms():
    ga_results = []
    hc_results = []
    sa_results = []
    
    for _ in range(RESULT_EXECUTION):
        # Algoritmo Genético (usando torneio como padrão)
        best_ga, time_ga, result_ga, _ = genetic_algorithm()
        ga_results.append((best_ga, time_ga, result_ga))
        
        # Subida da Colina
        best_hc, time_hc = hill_climbing()
        hc_results.append((best_hc, time_hc))
        
        # Recozimento Simulado
        best_sa, time_sa = simulated_annealing()
        sa_results.append((best_sa, time_sa))
    
    # Calcula médias
    avg_ga = sum(x[0] for x in ga_results) / RESULT_EXECUTION, sum(x[1] for x in ga_results) / RESULT_EXECUTION,
    avg_hc = sum(x[0] for x in hc_results) / RESULT_EXECUTION, sum(x[1] for x in hc_results) / RESULT_EXECUTION, 
    avg_sa = sum(x[0] for x in sa_results) / RESULT_EXECUTION, sum(x[1] for x in sa_results) / RESULT_EXECUTION 
    
    return avg_ga, avg_hc, avg_sa

# Compara métodos de seleção do Algoritmo Genético
def compare_genetics():
    tournament_results = []
    roulette_results = []
    sus_results = []
    
    for _ in range(RESULT_EXECUTION):
        # Torneio
        _, _, _, result_tournament = genetic_algorithm()
        tournament_results.append(sum(result_tournament)/len(result_tournament))
        
        # Roleta
        _, _, _, result_roulette = genetic_algorithm(selection_method='roulette')
        roulette_results.append(sum(result_roulette)/len(result_roulette))
        
        # SUS
        _, _, _, result_sus = genetic_algorithm(selection_method='sus')
        sus_results.append(sum(result_sus)/len(result_sus))
    
    return tournament_results, roulette_results, sus_results