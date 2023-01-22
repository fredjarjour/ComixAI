<main class="container">
<article class="grid">
    <div>
      <hgroup>
        <h1>Sign in</h1>
        <h2>Welcome back!</h2>
      </hgroup>
      <form>
        <input type="text" name="login" placeholder="User" aria-label="Login" autocomplete="nickname" required>
        <input type="password" name="password" placeholder="Password" aria-label="Password" autocomplete="current-password" required>
        <!-- <fieldset>
          <label for="remember">
            <input type="checkbox" role="switch" id="remember" name="remember">
            Remember me
          </label>
        </fieldset> -->
        <button type="submit" class="contrast" onclick="event.preventDefault()">Login</button>
      </form>
    </div>
    <div></div>
  </article>
</main>

<style>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 7rem);
  padding: 1rem 0;
}

@keyframes fade-in {
  from {
    transform: scale(0)
  }
  to {
    transform: scale(1)
  }
}

article {
  padding: 0;
  overflow: hidden;
  animation: fade-in 0.5s ease-in-out;
}

article div {
  padding: 1rem;
}

@media (min-width: 576px) {
  main {
    padding: 1.25rem 0;
  }

  article div {
    padding: 1.25rem;
  }
}

@media (min-width: 768px) {
  main {
    padding: 1.5rem 0;
  }

  article div {
    padding: 1.5rem;
  }
}

@media (min-width: 992px) {
  main {
    padding: 1.75rem 0;
  }

  article div {
    padding: 1.75rem;
  }
}

@media (min-width: 1200px) {
  main {
    padding: 2rem 0;
  }

  article div {
    padding: 2rem;
  }
}

/* Nav */
summary[role="link"].secondary:is([aria-current],:hover,:active,:focus) {
  background-color: transparent;
  color: var(--secondary-hover);
}

/* Hero Image */
article div:nth-of-type(2) {
  display: none;
  background-color: #374956;
  background-image: url("../../lib/images/comic_panel.png");
  filter: blur(4px);
  background-position: center;
  background-size: cover;
}

@media (min-width: 992px) {
  .grid > div:nth-of-type(2) {
    display: block;
  }
}
</style>