import java.util.*;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.time.LocalDateTime; 
import java.util.HashMap;
import java.util.Map;
import java.util.Iterator;
import java.util.Set;

public class Cruise {
    static public int currentspeed;
    static public String turn_on;

    public static String get_time(){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
        LocalDateTime now = LocalDateTime.now();  
        return dtf.format(now);  
    }

    public static int increment(int speed) {
        speed++;
        return speed;
    }

    public static int decrement(int speed) {
        speed--;
        return speed;
    }

    public static boolean in_range(int speed){
        if (speed >= 25 && speed <= 75){
            return true;
        } else {
            return false;
        }
    }

    public static void print_log(TreeMap<String, String> log){
        Set set = log.entrySet();
        Iterator iterator = set.iterator();
        System.out.print("\n \n");
        while(iterator.hasNext()) {
            Map.Entry mentry = (Map.Entry)iterator.next();
            System.out.print(mentry.getKey() + ":      ");
            System.out.print(mentry.getValue() + "\n");
        }
        System.out.print("\n \n");
    }

    public static void main(String args[]) {

        Scanner sc = new Scanner(System.in);
        System.out.print("Enter current car speed: ");
        currentspeed = sc.nextInt();
        while (!in_range(currentspeed)){
            System.out.print("Car Speed must be between 25 mph and 75 mph.\n");
            System.out.print("Enter current car speed: ");
            currentspeed = sc.nextInt();
        }

        System.out.print("Car speed registered.\n");

        while(true){
            turn_on = sc.nextLine();
            if (turn_on.equals("1")){
                System.out.print("Cruise Control is running. Enter \n: '+' to increase speed, \n: '-' to decrease speed," +
                "\n: 'error log' to view Error Log, \n: 'speed log' to view Speed Log, \n: '0' to turn off, \n: 'help' to repeat.\n");
                break;
            } else {
                System.out.print("Enter '1' to turn on Cruise Control: ");
            }
        }

        TreeMap<String, String> Speed_Log = new TreeMap<String, String>();
        TreeMap<String, String> Error_Log = new TreeMap<String, String>();

        Speed_Log.put(get_time(), "Current speed: " + currentspeed);
        String running_input = sc.nextLine();

        while (turn_on.equals("1")){
            if (running_input.equals("+")){
                currentspeed = increment(currentspeed);
                if (!in_range(currentspeed)){
                    Error_Log.put(get_time(), "Warning: Cannot exceed limit of 75 mph.");
                    System.out.print("Warning: Cannot exceed limit of 75 mph. \n");
                    currentspeed = decrement(currentspeed);
                }
                Speed_Log.put(get_time(), "Current speed: " + currentspeed);
            }

            if (running_input.equals("-")){
                currentspeed = decrement(currentspeed);
                if (!in_range(currentspeed)){
                    System.out.print("Warning: Must be above starting limit of 25 mph. \n");
                    Error_Log.put(get_time(), "Warning: Must be above starting limit of 25 mph.");
                    currentspeed = increment(currentspeed);
                }
                Speed_Log.put(get_time(), "Current speed: " + currentspeed);
            }

            if (running_input.equals("0")){
                turn_on = "0";
                break;
            }

            if (running_input.equals("error log")){
                print_log(Error_Log);
            }

            if (running_input.equals("speed log")){
                print_log(Speed_Log);
            }

            if (running_input.equals("help")){
                System.out.print("Cruise Control is running. Enter \n: '+' to increase speed, \n: '-' to decrease speed," +
                "\n: 'error log' to view Error Log, \n: 'speed log' to view Speed Log, \n: '0' to turn off, \n: 'help' to repeat.\n");
            }

            System.out.print("Cruise Control is running. Current car speed: " + currentspeed + "\n");
            running_input = sc.nextLine();
        }

        System.out.print("Cruise Control turned off. \n");

        sc.close();
        
    }
}