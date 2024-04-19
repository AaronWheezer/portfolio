function carousel() {
    return {
      container: null,
      items: [],
      currentItem: 0,
      init() {
        this.container = this.$refs.container;
        this.items = this.$refs.items;
      },
      next() {
        if (this.currentItem < this.items.length - 3) {
          this.currentItem++;
          this.container.style.transform = `translateX(-${this.currentItem * (100 / 3)}%)`;
        }
      },
      prev() {
        if (this.currentItem > 0) {
          this.currentItem--;
          this.container.style.transform = `translateX(-${this.currentItem * (100 / 3)}%)`;
        }
      }
    }
  }
  