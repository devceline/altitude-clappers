<script>
  import { onMount } from "svelte";

  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  const clappersStorageKey = "altitude_clappers";
  export let clappers = [
    "Julian",
    "Sheva",
    "Shaheen",
    "Pablo",
    "Shreemathi",
    "Ashwini",
    "Nyah",
    "Joseph",
    "Mike",
    "Amir",
    "Lucas",
    "Vlad",
    "Lulu",
  ];

  const clappersData = JSON.parse(
    localStorage.getItem(clappersStorageKey) || "{}"
  );

  shuffle(clappers);
  clappers.sort((a, b) => clappersData[a] > clappersData[b]);
  let clappersTrueState = Object.fromEntries(
    clappers.map((clapper) => [clapper, clappersData[clapper] || false])
  );

  localStorage.setItem(clappersStorageKey, JSON.stringify(clappersTrueState));
  // Clappers go to the bottom

  export let todaysClapper = clappers[0];

  const handleTodaysClapperClicked = () => {
    clappersTrueState[todaysClapper] = true;
    localStorage.setItem(clappersStorageKey, JSON.stringify(clappersTrueState));
  };

  const handleChangeTodaysClapper = (event) => {
    const clapper = event.target.innerText;
    if (!clappersTrueState[clapper]) todaysClapper = clapper;
  };

  onMount(() => {
    console.log("hey");
    if (
      Object.entries(clappersTrueState).filter(
        ([, clapped]) => clapped === false
      ).length === 0
    ) {
      const newState = Object.fromEntries(
        Object.entries(clappersTrueState).map(([clapper]) => [clapper, false])
      );
      clappersTrueState = { ...newState };
      localStorage.setItem(clappersStorageKey, JSON.stringify(newState));
    }
  });
</script>

<main>
  <div class="ClappersGrid">
    {#each Object.entries(clappersTrueState) as [clapper, clapperClapped] (clapper)}
      <div
        on:click={handleChangeTodaysClapper}
        class="ClappersGrid__clapper ClappersGrid__clapper--{clapperClapped
          ? 'clapped'
          : 'unclapped'}"
      >
        {clapper}
      </div>
    {/each}
  </div>
  <div class="TodaysClapper">
    <div>
      <h1>Today's Clap Announcer</h1>
      <div
        on:click={handleTodaysClapperClicked}
        class="ClappersGird__clapper TodaysClapper__clapper TodaysClapper__clapper--{clappersTrueState[
          todaysClapper
        ]
          ? 'clapped'
          : 'unclapped'}"
      >
        {todaysClapper}
      </div>
    </div>
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap");

  * {
    box-sizing: content-box;
    font-family: "Lato", sans-serif;
  }

  main {
    margin: 2em auto;
    margin-bottom: 3em;
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  .ClappersGrid {
    display: grid;
    grid-template-rows: repeat(auto-fit, minmax(4em, 1fr));
    max-height: 100vh;
    gap: 1em;
    max-width: 15vw;
    margin-bottom: 1em;
  }

  .ClappersGrid__clapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    text-align: center;
    align-items: center;
    font-weight: 700;
    box-shadow: 0 1px 15px 0 rgba(0, 0, 0, 0.050980392156862744);
    border-radius: 6px;
    min-width: 4em;
    min-height: 3em;
    word-wrap: break-word;
    transition: all 0.2s ease-in;
  }

  .ClappersGrid__clapper:hover {
    outline: #008eed 1px solid;
  }

  .TodaysClapper {
    display: grid;
    justify-content: center;
    text-align: center;
  }

  .TodaysClapper__clapper {
    transition: all 0.25s ease;
    margin: 1em;
    display: grid;
    font-size: 3em;
    cursor: pointer;
    background-color: rgb(245, 248, 250);
    padding: 5em;
  }

  .TodaysClapper__clapper--clapped {
    background-color: #008eed;
    color: #e6eaee;
    animation-name: hellaSpinning;
    animation-duration: 0.5s;
    animation-iteration-count: 3;
    animation-delay: 0;
  }

  .TodaysClapper__clapper--clapped::after {
    content: "👏👏";
    animation-name: clap;
    animation-duration: 0.2s;
    animation-iteration-count: 30;
    animation-delay: 0;
  }

  .ClappersGrid__clapper--clapped {
    background-color: #008eed;
    color: #e6eaee;
  }

  .ClappersGrid__clapper--unclapped {
    background-color: rgba(0, 142, 237, 0.1);
    color: rgb(53, 64, 82);
  }

  @keyframes hellaSpinning {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes clap {
    from {
      opacity: 0;
    }
    to {
      opacity: 100;
    }
  }
</style>
