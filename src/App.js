import { useEffect, useState } from "react";
import { fetchImages } from "./api";



function Header() {
    return (
      <header className="hero is-white is-bold">
        <div className="half-body">
          <div className="container">
            <h1 className="title"><font face="Impact">~Dog~</font></h1>
          </div>
          <h2>犬の画像が検索できるサイトです。</h2>
        </div>
      </header>
    );
  }
  
  function Image(props) {
   return (
      <div className="photo">
        <div className="photo-image">
          <figure className="image">
          <img src={props.src} alt="dog" />
          </figure>
        </div>
      </div>
    );
  }
  
  function Loading() {
     return <p><font face="Impact">読み込み中です。少々お待ちください。</font></p>;
    }

  function Gallery(props) {
      const { urls } = props;
      if (urls == null) {
            return <Loading />;
          }  
    return (
      <div className="columns is-vcentered is-multiline">
         {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })}
      </div>
    );
  }

 

  function Form(props) {
      function handleSubmit(event) {
        event.preventDefault();
        const { breed } = event.target.elements;
        props.onFormSubmit(breed.value);
      }
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="field has-addons">
              <div className="control is-expanded">
                <div className="select is-halfwidth">
                  <select name="breed" defaultValue="husky">
                    <option value="shiba">柴犬</option>
                    <option value="akita">秋田犬</option>
                    <option value="beagle">ビーグル</option>
                    <option value="husky">ハスキー</option>
                    <option value="boxer">ボクサー犬</option>
                    <option value="borzoi">ボルゾイ</option>
                    <option value="beagle">ビーグル</option>
                    <option value="doberman">ドーベルマン</option>
                    <option value="maltese">マルチーズ</option>
                    <option value="mix">ミックス犬</option>
                    <option value="affenpinscher">アーフェンピンシャー</option>
                    <option value="african">アフリカン</option>
                    <option value="airedale">エアデール</option>
                    <option value="appenzeller">アッペンツェルチーズ</option>
                    <option value="basenji">バセンジー</option>
                    <option value="brabancon">プチ・ブラバンソン</option>
                    <option value="briard">ブリアード</option>
                    

                    
                  </select>
                </div>
              </div>
              <div className="control">
                <button type="submit" className="button is-black">
                  🐶
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
    
  
  function Main() {
    const [urls, setUrls] = useState(null);
    useEffect(() => {
            fetchImages("husky").then((urls) => {
                setUrls(urls);
            });
          }, []);
          function reloadImages(breed) {
                fetchImages(breed).then((urls) => {
                  setUrls(urls);
                });
              }
              
          return (
          
      <main>
          <section className="section">
            
        <div className="container">
        <Form onFormSubmit={reloadImages} />
        </div>
      </section>
        <section className="section">
          <div className="container">
          <Gallery urls={urls} />
          </div>
        </section>
      </main>
    );
  }
  
  function Footer() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>Dog images are retrieved from Dog API</p>
          <p>
            <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
          </p>
        </div>
      </footer>
    );
  }
  
  function App() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
  
  export default App;