import { Link } from "@tanstack/react-router";
import { ArrowRight, ChefHat, Clock, CreditCard, MapPin, Utensils } from "lucide-react"

import { Button } from "@/components/ui/button"

import orderFoodImg from "../assets/order_food.png";
import prepareFoodImg from "../assets/prepare_food.png";
import deliverFoodImg from "../assets/deliver_food.png";

export default function LandingPage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#E6F0FF] to-white py-12 md:py-24 lg:py-32 xl:py-48">
          {/* Graphic elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="food-item absolute"
              style={{ top: "10%", left: "5%"}}>
              <div className="h-16 w-16 rounded-full bg-[#FFD700]/20 shadow-lg"></div>
            </div>
            <div
              className="food-item absolute"
              style={{ top: "70%", left: "15%"}}>
              <div className="h-12 w-12 rounded-full bg-[#FF6347]/20 shadow-lg"></div>
            </div>
            <div
              className="food-item absolute"
              style={{ top: "30%", right: "10%" }}>
              <div className="h-14 w-14 rounded-full bg-[#32CD32]/20 shadow-lg"></div>
            </div>
            <div
              className="food-item absolute"
              style={{ top: "80%", right: "20%"}}>
              <div className="h-10 w-10 rounded-full bg-[#9370DB]/20 shadow-lg"></div>
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col items-center text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                Food delivery right to your{" "}
                <span className="text-[#0052CC] relative">
                  Desk
                  <span className="absolute bottom-0 left-0 h-3 w-full bg-[#0052CC]/20"></span>
                </span>
              </h1>
              <p className="max-w-lg text-muted-foreground md:text-xl mx-auto">
                DeskDash connects hungry employees with delicious meals, delivered right to their workspace. No more leaving the office or waiting in line!
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="bg-[#0052CC] text-white hover:bg-[#0052CC]/90 shadow-lg transition-all hover:translate-y-[-2px]"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#0052CC] text-[#0052CC] hover:bg-[#0052CC]/10 transition-all hover:translate-y-[-2px]"
                  >
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats banner */}
        <section className="bg-[#0052CC] py-8 text-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <span className="text-3xl font-bold">30+</span>
                <span className="text-sm opacity-80">Minutes Saved</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <span className="text-3xl font-bold">20+</span>
                <span className="text-sm opacity-80">Companies</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <span className="text-3xl font-bold">15k+</span>
                <span className="text-sm opacity-80">Daily Users</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <span className="text-3xl font-bold">4.3 ✰</span>
                <span className="text-sm opacity-80">App Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-[#E6F0FF]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">One platform for everyone</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  DeskDash connects customers, kitchen staff, and delivery personnel in one seamless experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3 md:gap-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-[#0052CC] p-3 text-white">
                  <Utensils className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Customers</h3>
                <p className="text-center text-muted-foreground">
                  Browse menus, place orders, and track delivery in real-time. Pay securely and save your favorites.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-[#0052CC] p-3 text-white">
                  <ChefHat className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Kitchen Staff</h3>
                <p className="text-center text-muted-foreground">
                  Manage incoming orders, update preparation status, and optimise your kitchen workflow.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-[#0052CC] p-3 text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Delivery Staff</h3>
                <p className="text-center text-muted-foreground">
                  Get clear delivery instructions, optimise routes, and confirm deliveries with ease.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works with animated boxes */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-[#0052CC]/5"></div>
            <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-[#0052CC]/5"></div>
          </div>

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border border-[#0052CC] bg-white px-3 py-1 text-sm text-[#0052CC]">
                <span>Streamlined Process</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How DeskDash Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  A simple process designed to get food from the kitchen to your desk as quickly as possible.
                </p>
              </div>
            </div>

            <div className="relative mx-auto mt-16 max-w-5xl">
              {/* Connection line */}
              <div className="absolute left-1/2 top-12 h-[calc(100%-4rem)] w-1 -translate-x-1/2 bg-[#E6F0FF] md:left-0 md:top-1/2 md:h-1 md:w-full md:-translate-y-1/2"></div>

              <div className="grid gap-8 md:grid-cols-3">
                <div className="relative flex flex-col items-center md:items-start">
                  <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#0052CC] text-xl font-bold text-white shadow-lg">
                    1
                  </div>
                  <div className="mt-4 rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl">
                    <h3 className="text-xl font-bold">Order</h3>
                    <p className="mt-2 text-muted-foreground">
                      Browse the menu, select your items, and place your order with just a few clicks.
                    </p>
                    <div className="flex justify-center items-center">
                    <img
                      src={orderFoodImg}
                      alt="Order food illustration"
                      width={200}
                      height={120}
                      className="mt-4 rounded-lg"
                    />
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col items-center md:items-start">
                  <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#0052CC] text-xl font-bold text-white shadow-lg">
                    2
                  </div>
                  <div className="mt-4 rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl">
                    <h3 className="text-xl font-bold">Prepare</h3>
                    <p className="mt-2 text-muted-foreground">
                      Kitchen staff receives your order and prepares your meal with care and efficiency.
                    </p>
                    <div className="flex justify-center items-center">
                    <img
                      src={prepareFoodImg}
                      alt="Food preparation illustration"
                      width={200}
                      height={120}
                      className="mt-4 rounded-lg"
                    />
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col items-center md:items-start">
                  <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#0052CC] text-xl font-bold text-white shadow-lg">
                    3
                  </div>
                  <div className="mt-4 rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl">
                    <h3 className="text-xl font-bold">Deliver</h3>
                    <p className="mt-2 text-muted-foreground">
                      Delivery staff can bring your scheduled order directly to your desk, hot and fresh.
                    </p>
                    <div className="flex justify-center items-center">
                    <img
                      src={deliverFoodImg}
                      alt="Food delivery illustration"
                      width={200}
                      height={120}
                      className="mt-4 rounded-lg"
                    />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0052CC] text-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    Ready to simplify workplace dining?
                  </h2>
                  <p className="md:text-xl">
                    Join thousands of satisfied employees who enjoy fresh, delicious meals delivered right to their
                    desk.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/signup">
                    <Button size="lg" className="bg-white text-[#0052CC] hover:bg-white/90">
                      Sign Up Now
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg bg-white p-6 text-black">
                <h3 className="text-2xl font-bold">Why businesses love DeskDash</h3>
                <ul className="grid gap-4">
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-[#0052CC]" />
                    <div>
                      <h4 className="font-bold">Increased Productivity</h4>
                      <p className="text-muted-foreground">
                        Employees save 30+ minutes per meal by not leaving the office
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CreditCard className="h-5 w-5 text-[#0052CC]" />
                    <div>
                      <h4 className="font-bold">Simplified Billing</h4>
                      <p className="text-muted-foreground">Consolidated billing and expense management for companies</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Utensils className="h-5 w-5 text-[#0052CC]" />
                    <div>
                      <h4 className="font-bold">Employee Satisfaction</h4>
                      <p className="text-muted-foreground">Better food options lead to happier, more engaged teams</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

