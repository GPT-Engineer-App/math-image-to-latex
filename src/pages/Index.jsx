import React, { useState } from "react";
import { Box, Heading, Text, VStack, Image, Button, Textarea, useToast } from "@chakra-ui/react";
import { FaUpload, FaCopy } from "react-icons/fa";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [latexCode, setLatexCode] = useState("");
  const toast = useToast();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    // TODO: Implement image to LaTeX conversion logic
    // For demonstration purposes, we'll set a dummy LaTeX code
    setLatexCode("\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(latexCode);
    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="600px" margin="auto" padding={8}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        Image to LaTeX Converter
      </Heading>
      <VStack spacing={6} alignItems="stretch">
        {selectedImage ? (
          <Image src={selectedImage} alt="Uploaded Image" />
        ) : (
          <Box borderWidth={2} borderStyle="dashed" borderColor="gray.300" borderRadius="md" padding={8} textAlign="center">
            <Text fontSize="xl" marginBottom={4}>
              Upload an image with mathematical equations
            </Text>
            <Button leftIcon={<FaUpload />} colorScheme="blue" as="label" htmlFor="imageUpload" cursor="pointer">
              Upload Image
            </Button>
            <input id="imageUpload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
          </Box>
        )}
        {latexCode && (
          <VStack spacing={4} alignItems="stretch">
            <Text fontSize="xl">Converted LaTeX Code:</Text>
            <Textarea value={latexCode} readOnly />
            <Button leftIcon={<FaCopy />} colorScheme="green" onClick={copyToClipboard}>
              Copy LaTeX Code
            </Button>
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
