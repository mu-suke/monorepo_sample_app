import { NextPage } from "next";
import React from "react";
import {
  Flex,
  Box,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormRow from "@/components/forms/FormRow";

interface Params {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const validations = yup.object().shape({
    email: yup.string().required("メールアドレスを入力してください"),
    password: yup.string().required("パスワードを入力してください"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Params>({
    resolver: yupResolver(validations),
  });
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form
              onSubmit={handleSubmit((params) => {
                console.log(params);
              })}
            >
              <FormRow id={"email"} label={"Email address"} errors={errors}>
                <Input {...register("email")} />
              </FormRow>
              <FormRow id={"password"} label={"Password"} errors={errors}>
                <Input {...register("password")} type="password" />
              </FormRow>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  type={"submit"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
