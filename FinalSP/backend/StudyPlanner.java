package backend;

import java.util.ArrayList;
import java.util.List;

public class StudyPlanner {
    private List<String> tasks;

    public StudyPlanner() {
        tasks = new ArrayList<>();
    }

    public void addTask(String task) {
        tasks.add(task);
    }

    public List<String> getTasks() {
        return tasks;
    }

    public static void main(String[] args) {
        StudyPlanner planner = new StudyPlanner();
        planner.addTask("Complete homework");
        System.out.println("Tasks: " + planner.getTasks());
    }
}
