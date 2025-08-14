import React, { useState, useEffect } from 'react';

// Card type definitions
export interface CardField {
  name: string;
  type: 'text' | 'html' | 'image' | 'audio' | 'video';
  required: boolean;
  value?: string;
}

export interface CardTemplate {
  name: string;
  question: string;
  answer: string;
  css?: string;
  javascript?: string;
}

export interface NoteType {
  id: string;
  name: string;
  description: string;
  fields: CardField[];
  templates: CardTemplate[];
  css: string;
  javascript: string;
  is_builtin: boolean;
}

// Built-in note types
const BUILTIN_NOTE_TYPES: NoteType[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Simple front and back card',
    fields: [
      { name: 'Front', type: 'text', required: true },
      { name: 'Back', type: 'html', required: true }
    ],
    templates: [
      { name: 'Card 1', question: '{{Front}}', answer: '{{Back}}' }
    ],
    css: '.card { font-family: arial; font-size: 20px; text-align: center; color: black; background-color: white; }',
    javascript: '',
    is_builtin: true
  },
  {
    id: 'basic-reverse',
    name: 'Basic (and reversed card)',
    description: 'Two cards: Front→Back and Back→Front',
    fields: [
      { name: 'Front', type: 'text', required: true },
      { name: 'Back', type: 'html', required: true }
    ],
    templates: [
      { name: 'Card 1', question: '{{Front}}', answer: '{{Back}}' },
      { name: 'Card 2', question: '{{Back}}', answer: '{{Front}}' }
    ],
    css: '.card { font-family: arial; font-size: 20px; text-align: center; color: black; background-color: white; }',
    javascript: '',
    is_builtin: true
  },
  {
    id: 'cloze',
    name: 'Cloze',
    description: 'Fill-in-the-blank cards with cloze deletions',
    fields: [
      { name: 'Text', type: 'html', required: true },
      { name: 'Extra', type: 'html', required: false }
    ],
    templates: [
      { name: 'Cloze', question: '{{cloze:Text}}', answer: '{{cloze:Text}}<br>{{Extra}}' }
    ],
    css: '.card { font-family: arial; font-size: 20px; text-align: center; color: black; background-color: white; } .cloze { font-weight: bold; color: blue; }',
    javascript: '',
    is_builtin: true
  },
  {
    id: 'image-occlusion',
    name: 'Image Occlusion',
    description: 'Hide parts of images for visual learning',
    fields: [
      { name: 'Image', type: 'image', required: true },
      { name: 'Header', type: 'text', required: false },
      { name: 'Footer', type: 'text', required: false }
    ],
    templates: [
      { name: 'Card', question: '{{Header}}<br>{{Image}}', answer: '{{Header}}<br>{{Image}}<br>{{Footer}}' }
    ],
    css: '.card { font-family: arial; font-size: 20px; text-align: center; color: black; background-color: white; }',
    javascript: '',
    is_builtin: true
  }
];

interface CardEditorProps {
  onSave: (note: any) => void;
  onCancel: () => void;
  initialNote?: any;
  deckId: string;
}

const CardEditor: React.FC<CardEditorProps> = ({ onSave, onCancel, initialNote, deckId }) => {
  const [selectedNoteType, setSelectedNoteType] = useState<NoteType>(BUILTIN_NOTE_TYPES[0]);
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});
  const [tags, setTags] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);
  const [customNoteTypes, setCustomNoteTypes] = useState<NoteType[]>([]);

  useEffect(() => {
    if (initialNote) {
      // Load existing note data
      const noteType = [...BUILTIN_NOTE_TYPES, ...customNoteTypes].find(
        nt => nt.id === initialNote.note_type_id
      );
      if (noteType) {
        setSelectedNoteType(noteType);
        setFieldValues(initialNote.fields || {});
        setTags(initialNote.tags?.join(', ') || '');
      }
    }
  }, [initialNote, customNoteTypes]);

  const handleFieldChange = (fieldName: string, value: string) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const renderField = (field: CardField) => {
    const value = fieldValues[field.name] || '';

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter ${field.name}`}
            required={field.required}
          />
        );

      case 'html':
        return (
          <div className="space-y-2">
            <textarea
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              placeholder={`Enter ${field.name} (HTML supported)`}
              required={field.required}
            />
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => handleFieldChange(field.name, value + '<b></b>')}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              >
                <b>B</b>
              </button>
              <button
                type="button"
                onClick={() => handleFieldChange(field.name, value + '<i></i>')}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              >
                <i>I</i>
              </button>
              <button
                type="button"
                onClick={() => handleFieldChange(field.name, value + '<u></u>')}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              >
                <u>U</u>
              </button>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // In a real implementation, you'd upload this file
                  handleFieldChange(field.name, `[image:${file.name}]`);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {value && (
              <div className="text-sm text-gray-600">
                Current: {value}
              </div>
            )}
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter ${field.name}`}
            required={field.required}
          />
        );
    }
  };

  const processClozeText = (text: string) => {
    // Process cloze deletions: {{c1::answer}} -> [...]
    return text.replace(/\{\{c\d+::([^}]+)\}\}/g, '[...]');
  };

  const renderPreview = () => {
    if (!selectedNoteType.templates.length) return null;

    const template = selectedNoteType.templates[0];
    let question = template.question;
    let answer = template.answer;

    // Replace field placeholders
    selectedNoteType.fields.forEach(field => {
      const value = fieldValues[field.name] || '';
      const placeholder = `{{${field.name}}}`;
      
      if (field.name === 'Text' && selectedNoteType.id === 'cloze') {
        // Special handling for cloze deletions
        const clozeQuestion = processClozeText(value);
        question = question.replace('{{cloze:Text}}', clozeQuestion);
        answer = answer.replace('{{cloze:Text}}', value);
      } else {
        question = question.replace(placeholder, value);
        answer = answer.replace(placeholder, value);
      }
    });

    return (
      <div className="border rounded-lg p-4 bg-gray-50">
        <h4 className="font-semibold mb-2">Preview</h4>
        <div className="space-y-4">
          <div>
            <h5 className="text-sm font-medium text-gray-700">Question:</h5>
            <div 
              className="border rounded p-3 bg-white"
              dangerouslySetInnerHTML={{ __html: question }}
              style={{ minHeight: '60px' }}
            />
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-700">Answer:</h5>
            <div 
              className="border rounded p-3 bg-white"
              dangerouslySetInnerHTML={{ __html: answer }}
              style={{ minHeight: '60px' }}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleSave = () => {
    // Validate required fields
    const missingFields = selectedNoteType.fields
      .filter(field => field.required && !fieldValues[field.name])
      .map(field => field.name);

    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.join(', ')}`);
      return;
    }

    const note = {
      note_type_id: selectedNoteType.id,
      deck_id: deckId,
      fields: fieldValues,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };

    onSave(note);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {initialNote ? 'Edit Card' : 'Add New Card'}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
          >
            {showPreview ? 'Hide' : 'Show'} Preview
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Note Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Type
            </label>
            <select
              value={selectedNoteType.id}
              onChange={(e) => {
                const noteType = [...BUILTIN_NOTE_TYPES, ...customNoteTypes].find(
                  nt => nt.id === e.target.value
                );
                if (noteType) {
                  setSelectedNoteType(noteType);
                  setFieldValues({});
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <optgroup label="Built-in Types">
                {BUILTIN_NOTE_TYPES.map(noteType => (
                  <option key={noteType.id} value={noteType.id}>
                    {noteType.name}
                  </option>
                ))}
              </optgroup>
              {customNoteTypes.length > 0 && (
                <optgroup label="Custom Types">
                  {customNoteTypes.map(noteType => (
                    <option key={noteType.id} value={noteType.id}>
                      {noteType.name}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
            <p className="text-sm text-gray-600 mt-1">
              {selectedNoteType.description}
            </p>
          </div>

          {/* Cloze Deletion Help */}
          {selectedNoteType.id === 'cloze' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Cloze Deletion Help</h4>
              <p className="text-sm text-blue-800 mb-2">
                Use <code>{'{{c1::text}}'}</code> to create cloze deletions:
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <code>{'{{c1::Paris}}'}</code> is the capital of France</li>
                <li>• The chemical formula for water is <code>{'{{c1::H2O}}'}</code></li>
                <li>• Use c1, c2, c3... for multiple deletions</li>
              </ul>
            </div>
          )}

          {/* Field Inputs */}
          <div className="space-y-4">
            {selectedNoteType.fields.map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.name}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tags separated by commas"
            />
            <p className="text-sm text-gray-600 mt-1">
              Use tags to organize and search your cards
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              {initialNote ? 'Update Card' : 'Add Card'}
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="lg:sticky lg:top-6">
            {renderPreview()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardEditor;