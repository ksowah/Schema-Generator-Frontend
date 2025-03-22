import React from "react";

type SchemaResponse = {
  schema: {
    [collection: string]: {
      fields: {
        [fieldName: string]: string;
      };
    };
  };
  indexes: {
    name: string;
    fields: string[];
  }[];
};

type Props = {
  response: string;
};

export default function SchemaVisualizer({ response }: Props) {
  let jsonPart: string | null = null;
  let textPart: string = response;

  // Attempt to extract JSON block from the response string
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    jsonPart = jsonMatch[0];
    textPart = response.slice(0, jsonMatch.index).trim(); // non-JSON part
  }

  let parsed: SchemaResponse | null = null;
  try {
    if (jsonPart) {
      const tryParsed = JSON.parse(jsonPart);
      if (tryParsed?.schema && tryParsed?.indexes) {
        parsed = tryParsed;
      }
    }
  } catch (e) {
    parsed = null;
  }

  if (!parsed) {
    // Fallback: full string render
    return (
      <div className="p-4 text-gray-800 text-center whitespace-pre-wrap">{response}</div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Display text part if exists */}
      {textPart && (
        <div className="text-gray-800 whitespace-pre-wrap text-center">{textPart}</div>
      )}

      {/* Render tables */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {Object.entries(parsed.schema).map(
          ([collectionName, collectionData]) => (
            <div
              key={collectionName}
              className="shadow border border-[#E1E4EA] h-fit"
            >
              <div className="px-4 h-[3rem] flex items-center bg-[#F3F3F3] ">
                <h2 className="text-lg font-bold capitalize">
                  {collectionName}
                </h2>
              </div>

              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-gray-300 text-gray-600">
                    <th className="p-3">Field</th>
                    <th className="">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(collectionData.fields).map(
                    ([fieldName, fieldType]) => (
                      <tr
                        key={fieldName}
                        className="p-4 border-t border-gray-100"
                      >
                        <td className="p-3 font-medium text-gray-800">
                          {fieldName}
                        </td>
                        <td className="text-gray-600">{fieldType}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          ),
        )}

        <div className="bg-white shadow border border-gray-200 h-fit">
          <div className="px-4 h-[3rem] flex items-center bg-[#F3F3F3] ">
            <h2 className="text-lg font-bold capitalize">Indexes</h2>
          </div>
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-gray-600">
                <th className="p-3">Name</th>
                <th className="">Fields</th>
              </tr>
            </thead>
            <tbody>
              {parsed.indexes.map((index, idx) => (
                <tr key={idx} className="border-t border-gray-100">
                  <td className="p-3 font-medium text-gray-800">
                    {index.name}
                  </td>
                  <td className="text-gray-600">
                    {index.fields.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
