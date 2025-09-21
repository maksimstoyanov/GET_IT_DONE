# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build-env
WORKDIR /app

# Copy csproj and restore
COPY *.csproj ./
RUN dotnet restore

# Copy all files
COPY . .

# Publish the app
RUN dotnet publish -c Release -o out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

# Create data folder for SQLite inside container
RUN mkdir -p /app/data

# Copy published app
COPY --from=build-env /app/out .

# Expose port 5000
EXPOSE 5000

# Run the app; migrations are applied automatically inside the container
CMD ["dotnet", "server.dll"]