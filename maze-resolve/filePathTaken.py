import os

class FilePathTaken:
    def __init__(self):
        self.manifesto = os.path.join('video-maker', 'src', 'paths', "manifesto.json")
        with open(self.manifesto, 'w') as arquivo:
            arquivo.write("[\n")
            arquivo.close()

    def start(self, episodio, estado):
        (x, y) = estado
        episode = episodio + 1

        with open(self.manifesto, 'a') as arquivo:
            arquivo.write("{\n")
            arquivo.write(f'"episode":{episode},\n')
            arquivo.write('"path": [\n')
            arquivo.write(f"[{x},{y}],\n")
            arquivo.close()

    def add(self, estado):
        (x, y) = estado
        with open(self.manifesto, 'a') as arquivo:
            arquivo.write(f"[{x},{y}],\n")

    def end(self):
        with open(self.manifesto, 'a') as arquivo:
            arquivo.write(']\n},\n')

    def finish(self):
        with open(self.manifesto, 'a') as arquivo:
            arquivo.write(']\n')