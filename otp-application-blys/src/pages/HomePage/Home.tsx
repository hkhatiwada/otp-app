import { Button, Center, PinInput, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PinSchemType, PinSchema } from "../../_schemas/pinSchema";
import { notifications } from "@mantine/notifications";

const Home = () => {
  const [otpStatus, setOtpStatus] = useState("");
  const navigate = useNavigate();

  const form = useForm<PinSchemType>({
    initialValues: {
      pin: "",
    },
    validate: zodResolver(PinSchema),
  });

  async function handleSubmit(values: any) {
    console.log(values);

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: values.pin }),
      });

      if (response.ok) {
        setOtpStatus("OTP generated successfully");
        navigate("/success");
        notifications.show({
          color: "green",
          message: otpStatus,
          title: "Form Submisson Success",
        });
      } else {
        const errorData = await response.json();
        setOtpStatus(errorData.error);
        notifications.show({
          color: "red",
          message: otpStatus,
          title: "Form Submisson Failed",
        });
      }
    } catch (error) {
      console.error("Error generating OTP:", error);
      setOtpStatus("Error generating OTP");
      notifications.show({
        color: "red",
        message: otpStatus,
        title: "Form Submisson Failed",
      });
    }
  }
  return (
    <>
      <Center maw={2000} h={"screen"} bg="var(--mantine-color-gray-light)">
        <Stack justify="center" align="center" gap={"xl"}>
          <h1>Example Otp Handler</h1>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack justify="center" align="center" gap={"xl"}>
              <PinInput
                size="xl"
                placeholder="_"
                type="number"
                length={6}
                {...form.getInputProps("pin")}
              />
              <Button type="submit"> Submit</Button>
            </Stack>
          </form>
          <p style={{ color: "red" }}> {form.errors && form.errors.pin}</p>
          {otpStatus && <p style={{ color: "red" }}>{otpStatus}</p>}
        </Stack>
      </Center>
    </>
  );
};

export default Home;
