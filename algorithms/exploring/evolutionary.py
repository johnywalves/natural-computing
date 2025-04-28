import time
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from evolutionary_functions import target, hill_climbing, iterative_hill_climbing, stochastic_hill_climbing, simulated_annealing

# ================================================
# Iniciar valores
# ================================================
default_max_iteration = 1000
default_initial_points = 100
default_y_max = 1

# ================================================
# Avaliar resultados
# ================================================
df = pd.DataFrame({"x": np.linspace(0, 1, 1000)})
df["y"] = df["x"].apply(target) 
line = df.plot(kind="line", x="x", y="y", figsize=(15,5), ylabel='Função aplicação')

start_time = time.time()
x_hill_climbing, y_hill_climbing, t_hill_climbing = hill_climbing(default_max_iteration, default_y_max)
print('{:.10f} segundos - hill climbing'.format(time.time() - start_time))
plt.scatter(x=[x_hill_climbing], y=[y_hill_climbing], s=220, c="red")

start_time = time.time()
x_iterative_hill_climbing, y_iterative_hill_climbing, t_iterative_hill_climbing = iterative_hill_climbing(default_initial_points, default_max_iteration, default_y_max)
print('{:.10f} segundos - iterative hill climbing'.format(time.time() - start_time))
plt.scatter(x=[x_iterative_hill_climbing], y=[y_iterative_hill_climbing], s=160, c="green")

start_time = time.time()
x_stochastic_hill_climbing, y_stochastic_hill_climbing, t_stochastic_hill_climbing = stochastic_hill_climbing(default_max_iteration, default_y_max)
print('{:.10f} segundos - stochastic hill climbing'.format(time.time() - start_time))
plt.scatter(x=[x_stochastic_hill_climbing], y=[y_stochastic_hill_climbing], s=120, c="blue")

start_time = time.time()
x_simulated_annealing, y_simulated_annealing, t_simulated_annealing = simulated_annealing()
print('{:.10f} segundos - simulated annealing'.format(time.time() - start_time))
plt.scatter(x=[x_simulated_annealing], y=[y_simulated_annealing], s=80, c="gray")

plt.savefig('figure.png')
