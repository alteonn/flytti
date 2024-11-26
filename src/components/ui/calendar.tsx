import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { sv } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
  mode?: 'single' | 'range';
}

export function Calendar({ selected, onSelect, className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end });

  const previousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const handleDateSelect = (date: Date) => {
    onSelect?.(date);
  };

  return (
    <div className={cn("p-3 bg-white rounded-lg shadow-sm", className)}>
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={previousMonth}
          className="hover:bg-primary-light/20"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-medium">
          {format(currentMonth, 'MMMM yyyy', { locale: sv })}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={nextMonth}
          className="hover:bg-primary-light/20"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-text-light py-1"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const isSelected = selected && isSameDay(day, selected);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          
          return (
            <Button
              key={i}
              variant="ghost"
              size="sm"
              onClick={() => handleDateSelect(day)}
              className={cn(
                "h-8 w-8 p-0 font-normal",
                !isCurrentMonth && "text-text-light/50",
                isSelected && "bg-primary text-white hover:bg-primary-dark",
                !isSelected && "hover:bg-primary-light/20"
              )}
            >
              {format(day, 'd')}
            </Button>
          );
        })}
      </div>
    </div>
  );
}