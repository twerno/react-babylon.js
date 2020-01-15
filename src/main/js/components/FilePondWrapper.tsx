import './filePondWrapper.css';
import 'filepond/dist/filepond.min.css';

import * as React from 'react';
import { File as PondFile, FilePond } from 'react-filepond';

// tslint:disable-next-line:no-var-requires
const filePondPluginFileValidateType = require('filepond-plugin-file-validate-type');

// Register the plugin
// registerPlugin(filePondPluginFileValidateType.default);

export interface IFilePondWrapperProps {
    processFile(fieldName: string, file: any, abort: () => void): Promise<string>;
}

interface IFilePondWrapperState {
    files: PondFile[] | undefined;
}

export class FilePondWrapper extends React.Component<IFilePondWrapperProps, IFilePondWrapperState> {
    private pond: FilePond | null = null;

    public constructor(props: IFilePondWrapperProps) {
        super(props);
        this.state = { files: undefined };
    }

    private process = (
        fieldName: string,
        file: any,
        metadata: { [key: string]: any },
        load: (p: string | { [key: string]: any }) => void,
        error: (errorText: string) => void,
        progress: (isLengthComputable: boolean, loadedDataAmount: number, totalDataAmount: number) => void,
        abort: () => void) => {

        this.props.processFile(fieldName, file, abort)
            .then(s => load(s))
            .catch(reason => error(reason));

        // TODO: progress
        // TODO: abort
        // // Should expose an abort method so the request can be cancelled
        // return {
        //     abort: () => {
        //         // This function is entered if the user has tapped the cancel button
        //         request.abort();

        //         // Let FilePond know the request has been cancelled
        //         abort();
        //     }
        // };
    }

    private filePondTypeValidator = (file: any): Promise<string> => {
        return new Promise((_resolve, _reject) => {
            if (file && typeof file.name === 'string') {
                const ext = (file.name as string).toLowerCase().split('.').pop();
                const type = ext === 'stl'
                    ? 'model/stl'
                    : '';
                _resolve(type);
            } else {
                _resolve('');
            }
        });
    }

    public render() {
        const fileValidationProps = {
            acceptedFileTypes: ['model/stl'],
            fileValidateTypeDetectType: this.filePondTypeValidator
        };

        return (
            <div className="outer-div">
                <div className="inner-div">
                    <FilePond
                        ref={ref => (this.pond = ref)}
                        files={this.state.files}
                        allowMultiple={false}
                        instantUpload={true}
                        server={
                            { process: this.process }
                        }
                        onupdatefiles={fileItems => {
                            // Set currently active file objects to this.state
                            this.setState({ files: fileItems });
                        }}
                        {...fileValidationProps}
                    />
                </div>
            </div>
        );
    }
}
