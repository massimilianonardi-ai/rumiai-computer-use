import Foundation
import AppKit
import Vision

struct CoordinateSpace: Codable {
    let kind: String
    let origin: String
    let width: Int
    let height: Int
}

struct Region: Codable {
    let x: Double
    let y: Double
    let width: Double
    let height: Double
    let coordinateSpace: RegionCoordinateSpace
}

struct RegionCoordinateSpace: Codable {
    let kind: String
    let origin: String
}

struct Observation: Codable {
    let kind: String
    let text: String
    let confidence: Double
    let region: Region
}

struct Response: Codable {
    let state: String
    let coordinateSpace: CoordinateSpace
    let observations: [Observation]
}

func fail(_ message: String) -> Never {
    FileHandle.standardError.write(Data((message + "\n").utf8))
    exit(1)
}

let input = FileHandle.standardInput.readDataToEndOfFile()
guard !input.isEmpty else { fail("empty image input") }
guard let image = NSImage(data: input) else { fail("invalid image data") }

var proposed = NSRect(origin: .zero, size: image.size)
guard let cgImage = image.cgImage(forProposedRect: &proposed, context: nil, hints: nil) else {
    fail("cannot decode image")
}

let request = VNRecognizeTextRequest()
request.recognitionLevel = .accurate
request.usesLanguageCorrection = true

let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
do {
    try handler.perform([request])
} catch {
    fail("vision request failed")
}

let frameWidth = cgImage.width
let frameHeight = cgImage.height
let results = (request.results ?? []).compactMap { observation -> Observation? in
    guard let candidate = observation.topCandidates(1).first else { return nil }
    let text = candidate.string.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !text.isEmpty else { return nil }

    let box = observation.boundingBox
    let x = box.minX * Double(frameWidth)
    let y = (1.0 - box.maxY) * Double(frameHeight)
    let width = box.width * Double(frameWidth)
    let height = box.height * Double(frameHeight)

    return Observation(
        kind: "text-region",
        text: text,
        confidence: Double(candidate.confidence),
        region: Region(
            x: x,
            y: y,
            width: width,
            height: height,
            coordinateSpace: RegionCoordinateSpace(kind: "capture-pixel", origin: "top-left")
        )
    )
}

let response = Response(
    state: "OBSERVED",
    coordinateSpace: CoordinateSpace(
        kind: "capture-pixel",
        origin: "top-left",
        width: frameWidth,
        height: frameHeight
    ),
    observations: results
)

let encoder = JSONEncoder()
do {
    let data = try encoder.encode(response)
    FileHandle.standardOutput.write(data)
    FileHandle.standardOutput.write(Data("\n".utf8))
} catch {
    fail("response encoding failed")
}
