#!/bin/bash

# Build the Next.js application
echo "Building the Next.js application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
  echo "Build successful!"
else
  echo "Build failed. Please fix the errors and try again."
  exit 1
fi

# Deploy options
echo "Select deployment option:"
echo "1. Deploy to Vercel"
echo "2. Deploy to Netlify"
echo "3. Export static files"
echo "4. Cancel"

read -p "Enter your choice (1-4): " choice

case $choice in
  1)
    echo "Deploying to Vercel..."
    npx vercel
    ;;
  2)
    echo "Deploying to Netlify..."
    npx netlify deploy
    ;;
  3)
    echo "Exporting static files..."
    # For Next.js 12+
    echo "Creating a static export in the 'out' directory..."
    npm run export
    echo "Static files have been generated in the 'out' directory"
    ;;
  4)
    echo "Deployment cancelled."
    exit 0
    ;;
  *)
    echo "Invalid option selected."
    exit 1
    ;;
esac

echo "Deployment process completed!"
