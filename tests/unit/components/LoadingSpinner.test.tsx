import { render, screen, fireEvent } from '@testing-library/react';
import { LoadingSpinner } from '../../../src/components/LoadingSpinner';
import { TimePeriod } from '../../../src/lib/types';

describe('LoadingSpinner', () => {
  it('should render spinner with default styles', () => {
    render(<LoadingSpinner timePeriod="normal" />);
    
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('rounded-full', 'h-8', 'w-8', 'border-b-2');
  });

  it('should not render during late night period', () => {
    render(<LoadingSpinner timePeriod="lateNight" />);
    
    const spinner = screen.queryByTestId('loading-spinner');
    expect(spinner).not.toBeInTheDocument();
  });

  it('should apply correct colors for different time periods', () => {
    const { rerender } = render(<LoadingSpinner timePeriod="fridayAfternoon" />);
    let spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('border-green-500');

    rerender(<LoadingSpinner timePeriod="mondayMorning" />);
    spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('border-red-500');

    rerender(<LoadingSpinner timePeriod="normal" />);
    spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('border-blue-500');

    rerender(<LoadingSpinner timePeriod="aprilFools" />);
    spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('border-blue-500');
  });

  it('should animate when cursor is not idle', () => {
    render(<LoadingSpinner timePeriod="normal" isCursorIdle={false} />);
    
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('animate-spin');
  });

  it('should not animate when cursor is idle', () => {
    render(<LoadingSpinner timePeriod="normal" isCursorIdle={true} />);
    
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).not.toHaveClass('animate-spin');
  });

  it('should apply layout broken styles', () => {
    render(<LoadingSpinner timePeriod="normal" isLayoutBroken={true} />);
    
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('animate-bounce', 'border-4', 'border-red-500');
    expect(spinner).not.toHaveClass('animate-spin');
  });

  it('should handle hover states correctly', () => {
    render(<LoadingSpinner timePeriod="normal" isCursorIdle={false} />);
    
    const spinner = screen.getByTestId('loading-spinner');
    
    // Should have hover classes when conditions are met
    expect(spinner).toHaveClass('hover:scale-110', 'hover:shadow-lg', 'cursor-pointer');
    
    // Test mouse events
    fireEvent.mouseEnter(spinner);
    expect(spinner).toHaveStyle('filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))');
    
    fireEvent.mouseLeave(spinner);
    expect(spinner).not.toHaveStyle('filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))');
  });

  it('should not have hover effects when layout is broken', () => {
    render(<LoadingSpinner timePeriod="normal" isLayoutBroken={true} />);
    
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).not.toHaveClass('hover:scale-110', 'hover:shadow-lg', 'cursor-pointer');
    
    // Hover should not add glow effect when layout is broken
    fireEvent.mouseEnter(spinner);
    expect(spinner).not.toHaveStyle('filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))');
  });

  it('should not have hover effects when cursor is idle', () => {
    render(<LoadingSpinner timePeriod="normal" isCursorIdle={true} />);
    
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).not.toHaveClass('cursor-pointer');
  });

  it('should combine multiple states correctly', () => {
    render(
      <LoadingSpinner 
        timePeriod="mondayMorning" 
        isCursorIdle={true} 
        isLayoutBroken={false} 
      />
    );
    
    const spinner = screen.getByTestId('loading-spinner');
    
    // Should have Monday morning red color
    expect(spinner).toHaveClass('border-red-500');
    // Should not animate due to idle cursor
    expect(spinner).not.toHaveClass('animate-spin');
    // Should not have layout broken styles
    expect(spinner).not.toHaveClass('animate-bounce', 'border-4');
  });

  it('should handle all time periods appropriately', () => {
    const timePeriods: TimePeriod[] = ['normal', 'mondayMorning', 'fridayAfternoon', 'aprilFools'];
    
    timePeriods.forEach(period => {
      const { unmount } = render(<LoadingSpinner timePeriod={period} />);
      
      const spinner = screen.getByTestId('loading-spinner');
      expect(spinner).toBeInTheDocument();
      
      // All periods except late night should render
      expect(spinner).toHaveClass('rounded-full');
      
      unmount();
    });
  });
});