import networkx as nx
import matplotlib.pyplot as plt
from nltk.corpus import wordnet as wn


def traverse(graph, start, node):
    graph.depth[node.name] = node.shortest_path_distance(start)
    for child in node.hyponyms():
        graph.add_edge(node.name, child.name)
        traverse(graph, start, child)


def hyponym_graph(start):
    G = nx.Graph()
    G.depth = {}
    traverse(G, start, start)
    return G


def graph_draw(graph):
    pos = nx.spring_layout(graph, seed=42)  # Set the positions of the nodes using the spring layout algorithm
    node_size = [2000 * graph.degree(n) for n in graph]  # Increase the node size for better visibility
    node_color = [graph.depth[n] for n in graph]

    # Beautify the graph
    plt.figure(figsize=(12, 8))
    nx.draw(graph, pos, node_size=node_size, node_color=node_color, cmap=plt.cm.Blues,
            with_labels=True, font_size=10, font_weight='bold', alpha=0.7, edge_color='gray', width=0.2)

    # Add node labels
    labels = {n: n.split('.')[0] for n in graph.nodes()}  # Use only the first part of the node name as the label
    nx.draw_networkx_labels(graph, pos, labels, font_size=12)

    plt.axis('off')  # Hide the axis
    plt.title('Hyponym Graph', fontsize=16)
    plt.show()


dog = wn.synset('amazon.n.01')
graph = hyponym_graph(dog)
graph_draw(graph)