import numpy as np
import matplotlib.pyplot as plt

def rosenbrock(x, y):
    return (1 - x)**2 + 100 * (y - x**2)**2

class Particle:
    def __init__(self, bounds):
        self.position = np.random.uniform(bounds[0][0], bounds[0][1], 2)
        self.velocity = np.random.uniform(-1, 1, 2)
        self.best_position = np.copy(self.position)
        self.best_value = float('inf')
        
    def update_velocity(self, global_best, w, c1, c2):
        r1, r2 = np.random.random(2)
        cognitive = c1 * r1 * (self.best_position - self.position)
        social = c2 * r2 * (global_best - self.position)
        self.velocity = w * self.velocity + cognitive + social
        
    def update_position(self, bounds):
        self.position += self.velocity
        # Confine within bounds
        self.position = np.clip(self.position, bounds[0][0], bounds[0][1])
        # Update best position
        current_value = rosenbrock(self.position[0], self.position[1])
        if current_value < self.best_value:
            self.best_position = np.copy(self.position)
            self.best_value = current_value

def pso(bounds, num_particles, max_iter, w, c1, c2):
    particles = [Particle(bounds) for _ in range(num_particles)]
    global_best = np.random.uniform(bounds[0][0], bounds[0][1], 2)
    global_best_value = float('inf')
    
    min_values = []
    avg_values = []
    
    for _ in range(max_iter):
        # Evaluate particles and update global best
        for particle in particles:
            value = rosenbrock(particle.position[0], particle.position[1])
            if value < global_best_value:
                global_best = np.copy(particle.position)
                global_best_value = value
        
        # Store statistics
        values = [rosenbrock(p.position[0], p.position[1]) for p in particles]
        min_values.append(min(values))
        avg_values.append(np.mean(values))
        
        # Update particles
        for particle in particles:
            particle.update_velocity(global_best, w, c1, c2)
            particle.update_position(bounds)
    
    return global_best, global_best_value, min_values, avg_values

