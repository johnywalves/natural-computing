import random

TARGET = [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1]
LENGTH = len(TARGET)
POP_SIZE = 100
GENERATIONS = 1000

# Cria um indivíduo aleatório com bits 0 ou 1
def create_individual():
    return [random.randint(0, 1) for _ in range(LENGTH)]

# Calcula a fitness como o número de bits corretos
def fitness(individual):
    return sum(1 for i, j in zip(individual, TARGET) if i == j)

# Seleção por torneio com tamanho k
def tournament_selection(population, k=3):
    selected = random.sample(population, k)
    return max(selected, key=fitness)

# Realiza crossover de um ponto com probabilidade crossover_rate
def crossover(parent1, parent2, crossover_rate):
    if random.random() > crossover_rate:
        return parent1, parent2
    
    point = random.randint(1, LENGTH-1)
    child1 = parent1[:point] + parent2[point:]
    child2 = parent2[:point] + parent1[point:]
    return child1, child2

# Aplica mutação bit a bit com probabilidade mutation_rate
def mutate(individual, mutation_rate):
    for i in range(len(individual)):
        if random.random() < mutation_rate:
            individual[i] = 1 - individual[i]
    return individual

# Executa o algoritmo genético com os parâmetros especificados
def genetic_algorithm(crossover_rate=0.8, mutation_rate=0.05, use_crossover=True, use_mutation=True):
    population = [create_individual() for _ in range(POP_SIZE)]
    
    for generation in range(GENERATIONS):
        # Avaliar população
        fitnesses = [fitness(ind) for ind in population]
        best_fitness = max(fitnesses)
        
        # Verificar critério de parada
        if best_fitness == LENGTH:
            return generation + 1  # Retorna a geração em que encontrou a solução
        
        # Criar nova população
        new_population = []
        
        while len(new_population) < POP_SIZE:
            # Seleção
            parent1 = tournament_selection(population)
            parent2 = tournament_selection(population)
            
            # Crossover
            if use_crossover:
                child1, child2 = crossover(parent1, parent2, crossover_rate)
            else:
                child1, child2 = parent1.copy(), parent2.copy()
            
            # Mutação
            if use_mutation:
                child1 = mutate(child1, mutation_rate)
                child2 = mutate(child2, mutation_rate)
            
            new_population.extend([child1, child2])
        
        population = new_population[:POP_SIZE]
    
    return GENERATIONS  # Retorna o máximo de gerações se não encontrar

# Testar diferentes combinações de taxas
def run_experiments():
    crossover_rates = [0.7, 0.8, 0.9]
    mutation_rates = [0.01, 0.05, 0.1]
    results = {}

    for cr in crossover_rates:
        for mr in mutation_rates:
            generations = []
            for _ in range(20):  # 20 execuções para cada configuração
                gen = genetic_algorithm(crossover_rate=cr, mutation_rate=mr)
                generations.append(gen)
            avg_gen = sum(generations) / len(generations)
            results[f"CR={cr}, MR={mr}"] = avg_gen
            print(f"Crossover {cr}, Mutação {mr}: Média {avg_gen:.1f} gerações")
    
    return results

def compare_operators():
    # Apenas crossover
    crossover_only = []
    for _ in range(20):
        gen = genetic_algorithm(crossover_rate=0.8, mutation_rate=0, use_mutation=False)
        crossover_only.append(gen)
    
    # Apenas mutação
    mutation_only = []
    for _ in range(20):
        gen = genetic_algorithm(crossover_rate=0, mutation_rate=0.05, use_crossover=False)
        mutation_only.append(gen)
    
    print(f"Apenas crossover: Média {sum(crossover_only)/len(crossover_only):.1f} gerações")
    print(f"Apenas mutação: Média {sum(mutation_only)/len(mutation_only):.1f} gerações")

compare_operators()



