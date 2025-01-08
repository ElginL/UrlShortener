import Form from "./components/form";

const Home: React.FC = () : React.ReactElement => {
    return (
        <div className="flex flex-col h-lvh items-center justify-center gap-24">
            <h1 className="text-6xl font-bold">
                Url Shortener
            </h1>
            <div className="flex flex-col items-center justify-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-10">
                <h2 className="text-2xl font-bold">
                    Paste Long URL to be shortened
                </h2>
                <Form />
                <p>
                    Url Shortener is a tool that helps to reduce the length of a long url,
                    making it easier to share with others!
                </p>
            </div>
        </div>
    );
};

export default Home;
