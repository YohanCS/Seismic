import java.util.*; //for some data structures
import org.json.*; //to parse JSON

//file used to read JSON and modify values
public class Read {
  /* going to read in the data using static vars as there is
   * only one instance of the data
   */
  private JSONParser jsonReader; //read JSON file
  private JSONArray jsonArray; //contain array found in jsonReader

  public static void main(String[] args) {
    jsonReader = new JSONParser(); //malloc object
    try ( FileReader reader = new FileReader("data01.INT.json")) {
      //read first JSON file given
      Object firstJSON = jsonReader.parse(reader); //parse it into Object

      jsonArray = (JSONArray) firstJSON;
      System.out.println(jsonArray);



    }
  } //ends main

} //ends class Read
