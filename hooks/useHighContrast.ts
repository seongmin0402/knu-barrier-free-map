import { useState, useEffect } from 'react';

export function useHighContrast() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('highContrastMode');
    if (savedMode === 'true') {
      setIsHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    }
  }, []);

  const toggleHighContrast = () => {
    const newMode = !isHighContrast;
    setIsHighContrast(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('high-contrast');
      localStorage.setItem('highContrastMode', 'true');
    } else {
      document.documentElement.classList.remove('high-contrast');
      localStorage.setItem('highContrastMode', 'false');
    }
  };

  return { isHighContrast, toggleHighContrast };
}
