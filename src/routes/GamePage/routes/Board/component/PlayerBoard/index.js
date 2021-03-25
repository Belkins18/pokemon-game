import {useState} from "react";
import cn from "classnames";
// Components
import PokemonCard from "../../../../../../components/PokemonCard";
// Styles
import s from "./style.module.css";

const PlayerBoard = ({card}) => {
    const [isSelected, setSelected] = useState(null)

    return (
        <>
            {
                card.map(item => (
                    <div key={item.id} className={cn(s.cardBoard, {[s.selected]: isSelected === item.id})}
                         onClick={() => setSelected(item.id)}>
                        <PokemonCard
                            id={item.id}
                            name={item.name}
                            img={item.img}
                            type={item.type}
                            values={item.values}
                            isActive={true}
                            minimize
                        />
                    </div>
                ))
            }
        </>
    )
}

export default PlayerBoard;