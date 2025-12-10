// historyLogic.cjs - CommonJS wrapper for Jest tests
// This file re-exports the ES Module version for compatibility with CommonJS test environment

class TabHistoryManager {
  constructor(maxSize = 5) {
    this.history = [];
    this.maxSize = maxSize;
  }

  activateTab(tabId) {
    this.history = this.history.filter(id => id !== tabId);
    this.history.unshift(tabId);
    if (this.history.length > this.maxSize) {
      this.history = this.history.slice(0, this.maxSize);
    }
  }

  /**
   * Restaura o histórico a partir de um estado salvo
   * @param {Array<number>} historyArray - Array de IDs de abas salvo anteriormente
   */
  hydrate(historyArray) {
    if (Array.isArray(historyArray)) {
      this.history = historyArray.slice(0, this.maxSize);
    }
  }

  /**
   * Retorna a posição de uma aba no histórico (0 = mais recente)
   * @param {number} tabId - ID da aba
   * @returns {number} - Posição ou -1 se não estiver no histórico
   */
  getPosition(tabId) {
    return this.history.indexOf(tabId);
  }

  /**
   * Calcula a opacidade baseada na posição (Mantido para compatibilidade, mesmo usando badges)
   */
  calculateOpacity(position) {
    if (position === -1) return 1;
    return Math.max(0.5, 1 - position * 0.25);
  }

  /**
   * Define o tamanho máximo do histórico
   * @param {number} size - Novo tamanho máximo
   */
  setMaxSize(size) {
    this.maxSize = size;
    // Ajusta o histórico se necessário
    if (this.history.length > this.maxSize) {
      this.history = this.history.slice(0, this.maxSize);
    }
  }

  /**
   * Retorna o histórico atual
   * @returns {Array<number>} - Array de IDs de abas
   */
  getHistory() {
    return [...this.history];
  }
}

module.exports = { TabHistoryManager };
