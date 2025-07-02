import numpy as np
from bitstring import DEFAULT_CROSSOVER, DEFAULT_MUTATION, create_individual, mutate, crossover
from maximization import tournament_selection

SEARCH_SPACE = (-5, 5)
BITSTRING_LENGTH = 30
POP_SIZE = [150, 200, 300]
MAX_GENERATIONS = 200
ELITISM_RATES = [0, 5, 10, 20]

# Decodifica bitstring para valores reais x e y
def decode_bitstring(bitstring):
    half = len(bitstring) // 2
    x_bits = bitstring[:half]
    y_bits = bitstring[half:]
    
    x_int = int(''.join(map(str, x_bits)), 2)
    y_int = int(''.join(map(str, y_bits)), 2)
    
    max_int = 2**half - 1
    x = SEARCH_SPACE[0] + (SEARCH_SPACE[1] - SEARCH_SPACE[0]) * x_int / max_int
    y = SEARCH_SPACE[0] + (SEARCH_SPACE[1] - SEARCH_SPACE[0]) * y_int / max_int

    return x, y

# Função de Avaliação
def rosenbrock(x, y):
    return (1 - x)**2 + 100 * (y - x**2)**2

# Avalia um indivíduo decodificando e calculando g(x)
def evaluate(individual):
    x, y = decode_bitstring(individual)
    return rosenbrock(x, y)

# Seleciona os melhores indivíduos para preservar
def apply_elitism(population, fitnesses, elite_size):
    elite_indices = np.argsort(fitnesses)[:elite_size]
    return [population[i] for i in elite_indices]

# Executa o algoritmo genético para minimizar Rosenbrock
def genetic_algorithm(pop_size=POP_SIZE[1], generations=MAX_GENERATIONS, crossover_rate=DEFAULT_CROSSOVER, 
                     mutation_rate=DEFAULT_MUTATION, elite_size=0):

    # Inicialização
    population = [create_individual(BITSTRING_LENGTH) for _ in range(pop_size)]
    best_fitness_history = []
    avg_fitness_history = []
    
    for _ in range(generations):
        # Avaliação
        fitnesses = [evaluate(ind) for ind in population]
        best_fitness = min(fitnesses)
        avg_fitness = np.mean(fitnesses)
        best_fitness_history.append(best_fitness)
        avg_fitness_history.append(avg_fitness)
        
        # Critério de parada (opcional)
        if best_fitness < 1e-6:  # Valor próximo do mínimo global
            break
        
        # Elitismo (se aplicável)
        elite = []
        if elite_size > 0:
            elite = apply_elitism(population, fitnesses, elite_size)
        
        # Seleção
        parents = [tournament_selection(population, fitnesses) 
                  for _ in range(pop_size - elite_size)]
        
        # Crossover e Mutação
        new_population = elite.copy()
        for i in range(0, len(parents), 2):
            if i+1 >= len(parents):
                break
            parent1, parent2 = parents[i], parents[i+1]
            child1, child2 = crossover(parent1, parent2, crossover_rate)
            new_population.extend([
                mutate(child1, mutation_rate), 
                mutate(child2, mutation_rate)
            ])
        
        population = new_population[:pop_size]
    
    # Resultado final
    final_fitnesses = [evaluate(ind) for ind in population]
    best_idx = np.argmin(final_fitnesses)
    best_individual = population[best_idx]
    best_x, best_y = decode_bitstring(best_individual)
    best_fitness = final_fitnesses[best_idx]
    
    return {
        'best_x': best_x,
        'best_y': best_y,
        'best_fitness': best_fitness,
        'history': {
            'best': best_fitness_history,
            'average': avg_fitness_history
        }
    }
