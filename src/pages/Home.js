export default function Home() {
  return (
    <div className="container">
      <h1>Welcome to RunSmart</h1>

      <p className="subtitle">
        Your beginner-friendly guide to choosing the right running shoes and
        preventing injuries.
      </p>

      <div className="card">
        <h3>Why This App?</h3>
        <ul>
          <li>Learn how to choose correct shoes</li>
          <li>Avoid running injuries</li>
          <li>Get personalized recommendations</li>
          <li>Stay motivated in your fitness journey</li>
        </ul>
      </div>

      <div className="card">
        <h3>How It Works</h3>
        <ol>
          <li>Login to your account</li>
          <li>Take the quick shoe quiz</li>
          <li>Get recommendation instantly</li>
          <li>Admin can manage shoe list</li>
        </ol>
      </div>
    </div>
  );
}