import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/config";

const Index = () => {
  return (
    <div>
      <h1>Hello</h1>
      <Button variant="ghost" onClick={() => auth.signOut()}>
        SignOut
      </Button>
    </div>
  );
};

export default Index;
