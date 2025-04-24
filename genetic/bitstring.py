import random
random.seed(42)

TARGET = [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1]
LENGTH = len(TARGET)
DEFAULT_CROSSOVER = 0.85
DEFAULT_MUTATION = 0.05
POP_SIZE = 100
GENERATIONS = 1000
GENERATIONS_BY_RATE = 20
CROSSOVER_RATES = [0.7, 0.8, 0.9]
MUTATION_RATES = [0.01, 0.05, 0.1]

# Cria um indivíduo aleatório com bits 0 ou 1
def create_individual(length):
    return [random.randint(0, 1) for _ in range(length)]

# Calcula a fitness como o número de bits corretos
def evaluate(individual):
    return sum(1 for i, j in zip(individual, TARGET) if i == j)

# Seleção por torneio com tamanho k
def tournament_selection(population, fitness, k=3):
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
    mutated = individual.copy()
    for i in range(len(mutated)):
        if random.random() < mutation_rate:
            mutated[i] = 1 - mutated[i]
    return mutated

# Executa o algoritmo genético com os parâmetros especificados
def genetic_algorithm(crossover_rate=DEFAULT_CROSSOVER, mutation_rate=DEFAULT_MUTATION, use_crossover=True, use_mutation=True):
    population = [create_individual(LENGTH) for _ in range(POP_SIZE)]
    
    for generation in range(GENERATIONS):
        # Avaliar população
        fitnesses = [evaluate(ind) for ind in population]
        best_fitness = max(fitnesses)
        
        # Verificar critério de parada
        if best_fitness == LENGTH:
            return generation + 1  # Retorna a geração em que encontrou a solução
        
        # Criar nova população
        new_population = []
        
        while len(new_population) < POP_SIZE:
            # Seleção
            parent1 = tournament_selection(population, evaluate)
            parent2 = tournament_selection(population, evaluate)
            
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
    results = {}

    for cr in CROSSOVER_RATES:
        for mr in MUTATION_RATES:
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
    crossover_only = ''
    crossover_only_list = []
    for cr in CROSSOVER_RATES:
        local_list = []
        for _ in range(GENERATIONS_BY_RATE):
            gen = genetic_algorithm(crossover_rate=cr, mutation_rate=0, use_mutation=False)
            local_list.append(gen)
            crossover_only_list.append(gen)
        crossover_only += f"""Rate {cr:.2f}  • Média {sum(local_list)/len(local_list):.1f} gerações  • Max {max(local_list)} gerações  • Min {min(local_list)} gerações\n"""
    crossover_only += f"""Média Geral {sum(crossover_only_list)/len(crossover_only_list):.1f} gerações"""

    # Apenas mutação
    mutation_only = ''
    mutation_only_list = []
    for mr in MUTATION_RATES:
        local_list = []
        for _ in range(GENERATIONS_BY_RATE):
            gen = genetic_algorithm(crossover_rate=0, mutation_rate=mr, use_crossover=False)
            local_list.append(gen)
            mutation_only_list.append(gen)
        mutation_only += f"""Rate {mr:.2f}  • Média {sum(local_list)/len(local_list):.1f} gerações  • Max {max(local_list)} gerações  • Min {min(local_list)} gerações\n"""
    mutation_only += f"""Média Geral {sum(mutation_only_list)/len(mutation_only_list):.1f} gerações"""

    # Ambas
    both = ''
    both_list = []
    for cr in CROSSOVER_RATES:
        for mr in MUTATION_RATES:
            generations = []
            for _ in range(GENERATIONS_BY_RATE):
                gen = genetic_algorithm(crossover_rate=cr, mutation_rate=mr)
                generations.append(gen)
                both_list.append(gen)
            avg_gen = sum(generations) / len(generations)
            both += f"Crossover {cr:.1f} e Mutação {mr:.2f}  • Média {avg_gen:.1f} gerações\n"
    both += f"""Média Geral {sum(both_list)/len(both_list):.1f} gerações"""

    return crossover_only, mutation_only, both




