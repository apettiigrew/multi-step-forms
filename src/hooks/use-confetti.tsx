import Confetti from 'react-confetti';

export const AppConfetti = () => {
    // const { width, height } = useWindowSize()
    const { innerWidth: width, innerHeight: height } = window;
    console.log(width, height);
    return (
        <Confetti
            tweenDuration={1000}
            width={width}
            height={height}
        />
    )
}
