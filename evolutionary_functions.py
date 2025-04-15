import math
import random

# ================================================
# Iniciar valores
# ================================================
decay = 3
x_initial = 0
t_initial = 0

# ================================================
# Declarar funções
# ================================================
def target(x):
    return pow(2, (-2 * pow(((x - 0.1) / 0.9), 2))) * pow((math.sin(5* math.pi  *x)), 6)

def disturb(x):
    return x + 0.01

def hill_climbing(max_iteration, y_max):
    x = x_initial
    y = target(x)
    t = t_initial

    y_better= y
    x_better = x

    while t <= max_iteration and y != y_max:
        x  = disturb(x)
        y = target(x)

        if y > y_better:
            x_better = x
            y_better = y

        t += 1

    return x_better, y_better, t

def iterative_hill_climbing(n_max, max_iteration, y_max):
    x = x_initial
    y = target(x)
    t = t_initial

    y_better= y

    while t <= n_max and y != y_max:
        x, _, _ = hill_climbing(max_iteration, y_max)
        y = target(x)
        t += 1

        if y > y_better:
            x_better = x
            y_better = y

    return x_better, y_better, t

def stochastic_hill_climbing(max_iteration, y_max):
    x = x_initial
    y = target(x)
    t = t_initial

    while t <= max_iteration and y != y_max:
        x_disturbed  = disturb(x)
        y_disturbed = target(x_disturbed)

        y = target(x)
        if random.random() > (1 / (1 + math.exp((y - y_disturbed) / decay))):
            x = x_disturbed

        t += 1

    return x, y, t

def simulated_annealing():
    x = x_initial
    y = target(x)
    t = t_initial

    y_better= y
    x_better = x

    while t <= 1000 and y != 1:
        x  = disturb(x)
        y = target(x)

        if y > y_better:
            x_better = x
            y_better = y

        t += 1

    return x_better, y_better, t

def simulated_annealing():
    x = x_initial
    y = target(x)
    t = t_initial

    y_better= y
    x_better = x

    while t <= 1000 and y != 1:
        x  = disturb(x)
        y = target(x)

        if y > y_better:
            x_better = x
            y_better = y

        t += 1

    return x_better, y_better, t
