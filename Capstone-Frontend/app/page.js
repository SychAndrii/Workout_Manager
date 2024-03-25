"use client";
import useLogout from "@/src/auth/hooks/useLogout";
import useIdToken from "@/src/auth/hooks/useIdToken";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExercisesTab from "./tabs/ExercisesTab";
import WorkoutsTab from "./tabs/WorkoutsTab";

export default function App() {
  const logout = useLogout();
  const idToken = useIdToken();
  console.log(idToken?.toString());

  return (
    <>
      <div className=" w-[1200px] mx-auto">
        <Tabs defaultValue="workouts" className="w-full">
          <header className="mb-3">
            <div className=" flex items-center">
              <h1 className=" mr-4">Hello!</h1>
              <button
                onClick={logout}
                type="button"
                class="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[04px_9px-4pxrgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px-4pxrgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px-4pxrgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px-4pxrgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px-4px#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px-4pxrgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px-4pxrgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
              >
                Logout
              </button>
            </div>
            <TabsList className="w-full flex my-3">
              <TabsTrigger className="w-full" value="exercises">
                Exercises
              </TabsTrigger>
              <TabsTrigger className="w-full" value="workouts">
                Workouts
              </TabsTrigger>
              <TabsTrigger className="w-full" value="calendar">
                Calendar
              </TabsTrigger>
            </TabsList>
          </header>
          <main>
            <TabsContent value="exercises" key={"exercises"}>
              <ExercisesTab />
            </TabsContent>
            <TabsContent value="workouts" key={"workouts"}>
              <WorkoutsTab />
            </TabsContent>
          </main>
        </Tabs>
      </div>
    </>
  );
}
