import {
	Button,
	Text,
	Input,
	NumberInput,
	NumberInputField,
	Radio,
	RadioGroup,
	Stack,
	HStack,
	Container,
} from "@chakra-ui/react";
import { useState } from "react";
import { Result } from "../Results/Result";

function DiceRoller(props: any) {
	let die = props.die;

	const [value, setValue] = useState("1");
	const [numDie, setNumDie] = useState(1);
	const [modifier, setModifier] = useState(0);
	const [result, setResult] = useState("");

	function rollDice() {
		var result = new Result();
		var rolls: Array<number> = [];

		for (let roll = 0; roll < numDie; roll++) {
			rolls.push(Math.floor(Math.random() * die) + 1);
		}

		result.modifier = modifier * parseInt(value);
		result.rolls = rolls;
		result.die = die;

		result.result =
			rolls.reduce((accumulator, current) => {
				return accumulator + current;
			}, 0) + result.modifier;

		props.getDiceFunc(result);
		setResult(result.result.toString());
	}

	return (
		<>
			<HStack spacing="24px">
				<NumberInput
					defaultValue={1}
					maxW={"80px"}
					min={0}
					name="numDie"
					onChange={(_value, valueAsNumber) => {
						return setNumDie(valueAsNumber);
					}}
				>
					<NumberInputField />
					{/* <NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper> */}
				</NumberInput>
				<Container maxW={"40px"} padding="0">
					<Text>d{die}</Text>
				</Container>
				<RadioGroup maxW={"60px"} onChange={setValue} value={value}>
					<Stack direction="row">
						<Radio value="1">+</Radio>
						<Radio value="-1">-</Radio>
					</Stack>
				</RadioGroup>
				<NumberInput
					defaultValue={0}
					name="modifier"
					maxW={"80px"}
					onChange={(_valueAsString, valueAsNumber) => {
						return setModifier(valueAsNumber);
					}}
				>
					<NumberInputField />
					{/* <NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper> */}
				</NumberInput>
				<Button colorScheme="blue" onClick={rollDice}>
					Roll
				</Button>
				<Input maxW={"120px"} isReadOnly value={result} />
			</HStack>
		</>
	);
}

export default DiceRoller;
