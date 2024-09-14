class TopoLogicalSort {
  public edges: {[key: string]: string[]} = {};
  public inDegree: {[key: string]: number} = {};
  public result: string[] = [];
  private visited: Set<string> = new Set();

  order() {
      this.visited.clear();
      this.result = [];
      // console.log(this.edges);
      const dfs = (u: string) => {
          if (this.visited.has(u)) return;
          this.visited.add(u);
          if (this.edges[u]) {
              for(let v of this.edges[u]) {
                  dfs(v);
              }
          }
          this.result.push(u);
          return;
      }
      for(let u in this.inDegree) {
          if(this.inDegree[u] == 0) {
              dfs(u);
          }
      }
      return this.result;
  }

  addEdge(u: string, v: string) {
      if (!this.edges[u]) this.edges[u] = [];
      this.edges[u].push(v);
      if (!this.inDegree[u]) this.inDegree[u] = 0;
      if (!this.inDegree[v]) this.inDegree[v] = 0;
      this.inDegree[v]++;
  }

  deleteVertex(u: string) {
      if (!this.inDegree[u]) return;
      if (this.edges[u]) {
          for (let v of this.edges[u]) {
              this.inDegree[v]--;
          }
          delete this.edges[u];
      }
      delete this.inDegree[u];
      Object.values(this.edges).forEach(vs => vs = vs.filter(v => v != u));
  }
}