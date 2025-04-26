class ScrollToTopPlugin {
    constructor(config = {}) {
      // Default configuration
      this.config = {
        position: config.position || 'bottom-right', // 'bottom-left' or 'bottom-right'
        buttonSize: config.buttonSize || 50,
        buttonColor: config.buttonColor || '#333',
        scrollThreshold: config.scrollThreshold || 300,
        zIndex: config.zIndex || 1000
      };
      
      this.button = null;
      this.isVisible = false;
    }
  
    init() {
      this.createButton();
      this.addEventListeners();
      this.updateButtonPosition();
      //alert('Scroll to Top Plugin Initialized!'); 
    }
  
    createButton() {
      this.button = document.createElement('button');
      this.button.innerHTML = '↑';
      this.button.setAttribute('aria-label', 'Scroll to top');
      
      Object.assign(this.button.style, {
        position: 'fixed',
        bottom: '20px',
        [this.config.position === 'bottom-left' ? 'left' : 'right']: '20px',
        width: `${this.config.buttonSize}px`,
        height: `${this.config.buttonSize}px`,
        backgroundColor: this.config.buttonColor,
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        transition: 'opacity 0.3s, transform 0.3s',
        zIndex: this.config.zIndex
      });
  
      document.body.appendChild(this.button);
    }
  
    updateButtonPosition() {
      if (this.button) {
        this.button.style.left = this.config.position === 'bottom-left' ? '20px' : 'auto';
        this.button.style.right = this.config.position === 'bottom-right' ? '20px' : 'auto';
      }
    }
  
    addEventListeners() {
      this.button.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
  
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > this.config.scrollThreshold && !this.isVisible) {
          this.showButton();
        } else if (scrollPosition <= this.config.scrollThreshold && this.isVisible) {
          this.hideButton();
        }
      });
  
      this.button.addEventListener('mouseover', () => {
        this.button.style.transform = 'scale(1.1)';
      });
  
      this.button.addEventListener('mouseout', () => {
        this.button.style.transform = 'scale(1)';
      });
    }
  
    showButton() {
      this.button.style.display = 'flex';
      this.button.style.opacity = '1';
      this.isVisible = true;
    }
  
    hideButton() {
      this.button.style.opacity = '0';
      setTimeout(() => {
        this.button.style.display = 'none';
      }, 300);
      this.isVisible = false;
    }
  
    destroy() {
      if (this.button) {
        this.button.remove();
        this.button = null;
      }
      window.removeEventListener('scroll', this.updateButtonPosition);
    }
  }
  
  // Example usage:
  // const scrollPlugin = new ScrollToTopPlugin({
  //   position: 'bottom-left', // or 'bottom-right'
  //   buttonSize: 50,
  //   buttonColor: '#333',
  //   scrollThreshold: 300,
  //   zIndex: 1000
  // });
  // scrollPlugin.init();