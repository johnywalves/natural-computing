import numpy as np
from scipy.spatial import distance_matrix

class ACO:
    def __init__(self, cities, n_ants=50, n_iterations=200, alpha=1.0, beta=5.0, rho=0.5, q=100):
        self.cities = cities
        self.n = len(cities)
        self.distances = distance_matrix(cities, cities)
        
        # Parâmetros do ACO
        self.n_ants = n_ants
        self.n_iterations = n_iterations
        self.alpha = alpha  # Influência do feromônio
        self.beta = beta    # Influência da visibilidade (1/distância)
        self.rho = rho      # Taxa de evaporação
        self.q = q          # Constante de depósito
        
        # Inicialização da matriz de feromônio
        self.pheromone = np.ones((self.n, self.n)) / self.n
        
        # Histórico
        self.best_distance = float('inf')
        self.best_path = None
        self.history = []
    
    def run(self):
        for iteration in range(self.n_iterations):
            paths = self._construct_solutions()
            self._update_pheromone(paths)
            
            # Atualiza melhor solução
            current_best_path = min(paths, key=lambda x: x[1])
            if current_best_path[1] < self.best_distance:
                self.best_distance = current_best_path[1]
                self.best_path = current_best_path[0]
            
            self.history.append(self.best_distance)
            
            if iteration % 10 == 0:
                print(f"Iteração {iteration}: Melhor distância = {self.best_distance:.2f}")
    
    def _construct_solutions(self):
        paths = []
        for _ in range(self.n_ants):
            path = self._construct_path()
            distance = self._calculate_distance(path)
            paths.append((path, distance))
        return paths
    
    def _construct_path(self):
        path = []
        visited = set()
        
        # Começa em uma cidade aleatória
        current_city = np.random.randint(0, self.n)
        path.append(current_city)
        visited.add(current_city)
        
        while len(visited) < self.n:
            next_city = self._select_next_city(current_city, visited)
            path.append(next_city)
            visited.add(next_city)
            current_city = next_city
        
        return path
    
    def _select_next_city(self, current_city, visited):
        unvisited = [city for city in range(self.n) if city not in visited]
        
        # Calcula probabilidades
        pheromone = self.pheromone[current_city, unvisited]
        visibility = 1 / (self.distances[current_city, unvisited] + 1e-10)
        
        probabilities = (pheromone ** self.alpha) * (visibility ** self.beta)
        probabilities /= probabilities.sum()
        
        # Seleção por roleta
        return np.random.choice(unvisited, p=probabilities)
    
    def _calculate_distance(self, path):
        total = 0
        for i in range(len(path)):
            total += self.distances[path[i-1], path[i]]
        return total
    
    def _update_pheromone(self, paths):
        # Evaporação
        self.pheromone *= (1 - self.rho)
        
        # Depósito de feromônio
        for path, distance in paths:
            for i in range(len(path)):
                self.pheromone[path[i-1], path[i]] += self.q / distance
                self.pheromone[path[i], path[i-1]] += self.q / distance  # Matriz simétrica
        
        # Atualização elitista (melhor formiga deposita mais)
        best_path = min(paths, key=lambda x: x[1])[0]
        for i in range(len(best_path)):
            self.pheromone[best_path[i-1], best_path[i]] += self.q / self.best_distance
            self.pheromone[best_path[i], best_path[i-1]] += self.q / self.best_distance
