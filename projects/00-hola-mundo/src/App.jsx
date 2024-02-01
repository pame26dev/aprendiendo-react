import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";

const users = [
  {
    userName: "pame26dev",
    name: "Pamela Opazo Hernández",
    isFollowing: true,
  },
  {
    userName: "midudev",
    name: "Miguel Ángel Míguez",
    isFollowing: false,
  },
  {
    userName: "PacoHdezs",
    name: "Pablo Hdez",
    isFollowing: true,
  },
];

export function App() {
  //const format = (userName) => `@${userName}`

  return (
    <section className="App">
      {users.map(({ userName, name, isFollowing }) => (
        <TwitterFollowCard
          key={userName}
          userName={userName}
          initialIsFollowing={isFollowing}
        >
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  );
}
