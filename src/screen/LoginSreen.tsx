import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ActivityIndicator, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";;
import { z } from "zod";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

 type LoginProps ={
  setIsLoggedIn:(isLoggedIn:boolean) => void;
 }

 const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const LoginScreen:React.FC<LoginProps> = ({setIsLoggedIn}) => {
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  // const [isLoading, setIsLoading] = React.useState(false);
   const navigation = useNavigation<any>()

   const handleLogin = async (values: { email: string; password: string }, { setSubmitting }: any) => {
    const { email, password } = values;
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    
    setTimeout(async() => {
      if (email === "Abhijeet@gmail.com" && password === "123456") {
        await AsyncStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
        setIsLoggedIn(true);

      } else {
        Alert.alert("Error", "Invalid email or password");
      }
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.content}>
            {/* Logo/branding section */}
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>A</Text>
              </View>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.subtitleText}>
                Please sign in to continue
              </Text>
            </View>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={toFormikValidationSchema(loginSchema)}
              onSubmit={handleLogin}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                <View style={styles.formContainer}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                      placeholder="Enter your email"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      style={styles.input}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      placeholderTextColor="#9CA3AF"
                    />
                    {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                      placeholder="Enter your password"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      secureTextEntry
                      style={styles.input}
                      placeholderTextColor="#9CA3AF"
                    />
                    {touched.password && errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                  </View>

                  <TouchableOpacity style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleSubmit as any}
                    disabled={isSubmitting}
                    style={[styles.loginButton, isSubmitting && styles.loginButtonDisabled]}
                  >
                    {isSubmitting ? (
                      <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                      <Text style={styles.loginButtonText}>Sign In</Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text style={styles.signupLinkText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC"
  },
  keyboardAvoidingView: {
    flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 8
  },
  subtitleText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center"
  },
  formContainer: {
    width: "100%",
    marginBottom: 24
  },
  inputGroup: {
    marginBottom: 16
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4B5563",
    marginBottom: 8,
    marginLeft: 4
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1F2937"
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: 8,
    marginBottom: 24
  },
  forgotPasswordText: {
    color: "#3B82F6",
    fontWeight: "500",
    fontSize: 15
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  loginButtonDisabled: {
    backgroundColor: "#93C5FD"
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600"
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 32,
    justifyContent: "center"
  },
  signupText: {
    color: "#6B7280",
    fontSize: 16
  },
  signupLinkText: {
    color: "#3B82F6",
    fontWeight: "500",
    fontSize: 16
  }
});

export default LoginScreen;