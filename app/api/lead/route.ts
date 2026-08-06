import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate body using Zod schema
    const validationResult = leadFormSchema.safeParse(body);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string[]> = {};
      
      validationResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = [];
        }
        fieldErrors[fieldName].push(issue.message);
      });

      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please check the submitted fields.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Simulate database write / CRM integration latency (500ms)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulated submission record ID
    const submissionId = `ACC-LEAD-${Date.now().toString(36).toUpperCase()}`;

    // Return structured enterprise success response
    return NextResponse.json(
      {
        success: true,
        message: "Enterprise lead inquiry submitted successfully.",
        submissionId,
        timestamp: new Date().toISOString(),
        data: {
          name: validatedData.name,
          email: validatedData.email,
          company: validatedData.company,
          jobTitle: validatedData.jobTitle,
          employees: validatedData.employees,
          domain: validatedData.domain,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Route Error [/api/lead]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error occurred while processing lead.",
      },
      { status: 500 }
    );
  }
}
