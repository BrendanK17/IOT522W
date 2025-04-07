import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CalendarSearch } from "lucide-react";

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
    const currentDay = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  
    // If it's weekend, return Monday's shift
    if (currentDay === 0 || currentDay === 6) {
      const mondayShift = shiftSchedule[0];
      return mondayShift.shift !== "OFF" ? mondayShift : null;
    }
  
    // currentDay - 1 gives us correct index for shiftSchedule (Mon = 0 to Fri = 4)
    for (let i = currentDay - 1; i < shiftSchedule.length; i++) {
      const shift = shiftSchedule[i];
  
      if (shift.shift === "OFF") continue;
  
      const shiftStartTime = shift.shift.split(" - ")[0];
      const [shiftHour] = shiftStartTime.split(":").map(Number);
  
      if (i === currentDay - 1 && now.getHours() < shiftHour) {
        return shift;
      }
  
      if (i > currentDay - 1) {
        return shift;
      }
    }
  
    return null;
  };
  

  const nextShift = getNextShift();

  return (
    <Card className="overflow-hidden border-none shadow-md">
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
              <CalendarSearch className="h-8 w-8 text-blue-600 mr-2" />
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
