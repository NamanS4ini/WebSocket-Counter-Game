import connectDB from "@/lib/connectDB";
import { Counter } from "@/lib/counterSchema";

connectDB();

export async function GET(request: Request) {
  try {
    const counters = await Counter.findOne({});
    return new Response(JSON.stringify(counters), { status: 200 });
  } catch (error) {
    console.error("Error fetching counters:", error);
    return new Response("Failed to fetch counters", { status: 500 });
  }
}
export async function POST() {
  try {
    const newCounter = new Counter();
    await newCounter.save();
    return new Response(JSON.stringify(newCounter), { status: 201 });
  } catch (error) {
    console.error("Error creating counter:", error);
    return new Response("Failed to create counter", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, reset, regret, firstLoad } = await request.json();

    //* Check for firstLoad and increment playerCount
    if (firstLoad) {
      const counter = await Counter.findByIdAndUpdate(
        id,
        { $inc: { playerCount: 1, count: 1 } },
        { new: true }
      );
      if (!counter) {
        return new Response("Counter not found", { status: 404 });
      }
      return new Response(JSON.stringify(counter), { status: 200 });
    }

    //* Handle regret actions
    //* If regret is true, increment the regretCount
    if (regret) {
      const regretCounter = await Counter.findByIdAndUpdate(
        id,
        { $inc: { regretCount: 1 } },
        { new: true }
      );
      if (!regretCounter) {
        return new Response("Counter not found", { status: 404 });
      }
      return new Response(JSON.stringify(regretCounter), { status: 200 });
    }

    // * Handle reset actions
    //* If reset is true, reset the count to 0 and increment resetCount
    if (reset) {
      const resetCounter = await Counter.findByIdAndUpdate(
        id,
        { count: 0, $inc: { resetCount: 1 } },
        { new: true }
      );

      if (!resetCounter) {
        return new Response("Counter not found", { status: 404 });
      }
      return new Response(JSON.stringify(resetCounter), { status: 200 });
    }
    const currentCounter = await Counter.findById(id);
    if (!currentCounter) {
      return new Response("Counter not found", { status: 404 });
    }
    const updatedCounter = await Counter.findByIdAndUpdate(
      id,
      {
        $inc: { count: 1 },
        $max: { allTimeHigh: currentCounter.count + 1 },
      },
      { new: true }
    );

    if (!updatedCounter) {
      return new Response("Counter not found", { status: 404 });
    }
    return new Response(JSON.stringify(updatedCounter), { status: 200 });
  } catch (error) {
    console.error("Error updating counter:", error);
    return new Response("Failed to update counter", { status: 500 });
  }
}
