import { useState } from "react";
import {
	Box,
	Button,
	ChakraProvider,
	Container,
	Divider,
	HStack,
	Textarea,
	theme,
	VStack,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import DiceRoller from "../components/DiceRoller/DiceRoller";
import { Result } from "../components/Results/Result";

function App() {
	const [result, setResult] = useState("");

	const pull_data = (data: Result) => {
		var newRoll = data.rolls.length + "d" + data.die;
		if (data.modifier > 0) {
			newRoll += " + ";
			newRoll += data.modifier;
		}
		if (data.modifier < 0) {
			newRoll += " - ";
			newRoll += -1 * data.modifier;
		}
		newRoll += " = " + data.result;

		if (result.length === 0) {
			setResult(newRoll);
			return;
		}
		newRoll = result + "\n" + newRoll;
		setResult(newRoll);
	};

	function resetResults() {
		setResult("");
	}

	return (
		<ChakraProvider theme={theme}>
			<HStack spacing="24px">
				|<Box h={1} />
				<VStack
					// divider={<StackDivider borderColor="gray.200" />}
					spacing={4}
					align="stretch"
				>
					<Box h={1} />
					<DiceRoller die={4} getDiceFunc={pull_data} />
					<DiceRoller die={6} getDiceFunc={pull_data} />
					<DiceRoller die={8} getDiceFunc={pull_data} />
					<DiceRoller die={10} getDiceFunc={pull_data} />
					<DiceRoller die={12} getDiceFunc={pull_data} />
					<DiceRoller die={20} getDiceFunc={pull_data} />
					<DiceRoller die={100} getDiceFunc={pull_data} />
				</VStack>
				<VStack>
					<Textarea
						resize="none"
						h="300px"
						w="300px"
						variant="filled"
						readOnly
						value={result}
					/>
					<Button colorScheme="blue" onClick={resetResults}>
						Reset
					</Button>
				</VStack>
			</HStack>
			<Box h={2} />
			<Divider />
			<Box h={2} />
			<ColorModeSwitcher />
			<Box h={2} />
		</ChakraProvider>
	);
}

export default App;
