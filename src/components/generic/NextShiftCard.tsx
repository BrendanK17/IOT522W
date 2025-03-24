import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CalendarSearch } from "lucide-react";

// Define the NextShiftCard component
interface Shift {
  day: string;
  shift: string;
}

interface NextShiftCardProps {
  shiftSchedule: Shift[];
}

const NextShiftCard: React.FC<NextShiftCardProps> = ({ shiftSchedule }) => {
  const getNextShift = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // Sunday = 0, Monday = 1, etc.
    let nextShift = null;

    // Check for next upcoming shift
    for (let i = 0; i < shiftSchedule.length; i++) {
      const shiftDay = shiftSchedule[i];
      const shiftStartTime = shiftDay.shift.split(" - ")[0];
      const [shiftHour, shiftMinute] = shiftStartTime.split(":");

      // Skip if the shift is "OFF"
      if (shiftDay.shift === "OFF") continue;

      // Determine if the shift has already passed today
      if (dayOfWeek === i && new Date().getHours() < parseInt(shiftHour)) {
        nextShift = shiftDay;
        break;
      }

      // If we have passed today, or it's a later shift in the week, consider it the next shift
      if (dayOfWeek < i) {
        nextShift = shiftDay;
        break;
      }
    }

    return nextShift;
  };

  const nextShift = getNextShift();

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-gradient-to-br from-indigo-100 to-indigo-200"></div>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Next Shift</CardTitle>
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          <Clock className="h-4 w-4 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent>
        {nextShift ? (
          <div>
            <div className="flex items-center pb-4">
            <CalendarSearch className="h-8 w-8 text-blue-600 mr-2"/>
            </div>
            <div className="text-lg font-semibold text-blue-600">{nextShift.day}</div>
            <div className="text-sm text-gray-600">{nextShift.shift}</div>
          </div>
        ) : (
          <div className="text-sm text-gray-600">No upcoming shifts for this week!</div>
        )}
      </CardContent>
    </Card>
  );
};

export default NextShiftCard;
